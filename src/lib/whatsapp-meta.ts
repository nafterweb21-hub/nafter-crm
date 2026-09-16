/**
 * Meta WhatsApp Cloud API Utility
 * Handles communication with the official Meta WhatsApp Business API.
 */

export interface MetaWhatsAppMessage {
    to: string;
    text?: string;
    templateName?: string;
    languageCode?: string;
    accessToken?: string;
    phoneNumberId?: string;
}

export class MetaWhatsApp {
    private baseUrl: string;
    private accessToken: string;
    private phoneNumberId: string;

    constructor(accessToken?: string, phoneNumberId?: string) {
        this.baseUrl = "https://graph.facebook.com/v18.0";
        this.accessToken = accessToken || process.env.WHATSAPP_ACCESS_TOKEN || "";
        this.phoneNumberId = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || "";
    }

    /**
     * Send a text message via Meta Cloud API
     */
    async sendTextMessage({ to, text, accessToken, phoneNumberId }: MetaWhatsAppMessage) {
        const targetToken = accessToken || this.accessToken;
        const targetId = phoneNumberId || this.phoneNumberId;

        if (!targetToken || !targetId) {
            throw new Error("Meta Access Token and Phone Number ID are required.");
        }

        try {
            const response = await fetch(`${this.baseUrl}/${targetId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${targetToken}`
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to: to,
                    type: "text",
                    text: { body: text }
                })
            });

            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error("❌ Meta WhatsApp Send Error:", error);
            return { success: false, error };
        }
    }

    /**
     * Verify credentials by fetching the phone number's metadata
     */
    async verify(accessToken?: string, phoneNumberId?: string) {
        const targetToken = accessToken || this.accessToken;
        const targetId = phoneNumberId || this.phoneNumberId;

        if (!targetToken || !targetId) {
            return { success: false, error: "Access Token and Phone Number ID are required." };
        }

        try {
            const response = await fetch(`${this.baseUrl}/${targetId}?fields=verified_name,display_phone_number`, {
                headers: { "Authorization": `Bearer ${targetToken}` }
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, error };
        }
    }

    /**
     * Send a template message (required for initiating conversations)
     */
    async sendTemplateMessage({ to, templateName, languageCode = "en_US", accessToken, phoneNumberId }: MetaWhatsAppMessage) {
        const targetToken = accessToken || this.accessToken;
        const targetId = phoneNumberId || this.phoneNumberId;

        if (!targetToken || !targetId || !templateName) {
            throw new Error("Incomplete Meta Template credentials.");
        }

        try {
            const response = await fetch(`${this.baseUrl}/${targetId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${targetToken}`
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: to,
                    type: "template",
                    template: {
                        name: templateName,
                        language: { code: languageCode }
                    }
                })
            });

            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error("❌ Meta Template Send Error:", error);
            return { success: false, error };
        }
    }
}

export const metaWhatsApp = new MetaWhatsApp();
