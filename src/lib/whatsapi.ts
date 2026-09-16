/**
 * WhatsAPI Gateway Integration Utility
 * This utility handles communication with unofficial WhatsApp API gateways (e.g., WhatsAPI.io).
 */

export interface WhatsAPIMessage {
    number: string;
    message: string;
    instanceId?: string;
    token?: string;
}

export class WhatsAPI {
    private baseUrl: string;
    private instanceId: string;
    private token: string;

    constructor(baseUrl?: string, instanceId?: string, token?: string) {
        this.baseUrl = baseUrl || process.env.WHATSAPI_BASE_URL || "https://api.whatsapi.io/v1";
        this.instanceId = instanceId || process.env.WHATSAPI_INSTANCE_ID || "";
        this.token = token || process.env.WHATSAPI_TOKEN || "";
    }

    /**
     * Send a text message via WhatsAPI Gateway
     */
    async sendMessage({ number, message, instanceId, token }: WhatsAPIMessage) {
        const targetInstance = instanceId || this.instanceId;
        const targetToken = token || this.token;

        if (!targetInstance || !targetToken) {
            throw new Error("WhatsAPI Instance ID and Token are required.");
        }

        try {
            const response = await fetch(`${this.baseUrl}/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${targetToken}`
                },
                body: JSON.stringify({
                    instance_id: targetInstance,
                    number: number,
                    message: message
                })
            });

            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error("❌ WhatsAPI Send Error:", error);
            return { success: false, error };
        }
    }

    /**
     * Get instance status
     */
    async getStatus(instanceId?: string, token?: string) {
        const targetInstance = instanceId || this.instanceId;
        const targetToken = token || this.token;

        try {
            const response = await fetch(`${this.baseUrl}/status?instance_id=${targetInstance}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${targetToken}`
                }
            });
            return await response.json();
        } catch (error) {
            return { success: false, error };
        }
    }
}

export const whatsapi = new WhatsAPI();
