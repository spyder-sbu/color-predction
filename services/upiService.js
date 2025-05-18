const axios = require('axios');
const crypto = require('crypto');

class UPIService {
    constructor() {
        this.apiKey = process.env.UPI_API_KEY;
        this.merchantId = process.env.UPI_MERCHANT_ID;
        this.baseUrl = process.env.UPI_API_URL || 'https://api.upi.org/v1';
    }

    // Generate signature for API requests
    generateSignature(data) {
        const message = JSON.stringify(data);
        return crypto
            .createHmac('sha256', this.apiKey)
            .update(message)
            .digest('hex');
    }

    // Verify UPI transaction
    async verifyTransaction(upiId, amount, date) {
        try {
            const payload = {
                merchantId: this.merchantId,
                upiId: upiId,
                amount: amount,
                date: date,
                timestamp: new Date().toISOString()
            };

            const signature = this.generateSignature(payload);

            const response = await axios.post(`${this.baseUrl}/verify-transaction`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': this.apiKey,
                    'X-Signature': signature
                }
            });

            return {
                isValid: response.data.status === 'SUCCESS',
                transactionId: response.data.transactionId,
                details: response.data
            };
        } catch (error) {
            console.error('UPI verification error:', error);
            throw new Error('Failed to verify UPI transaction');
        }
    }

    // Get transaction status
    async getTransactionStatus(transactionId) {
        try {
            const payload = {
                merchantId: this.merchantId,
                transactionId: transactionId,
                timestamp: new Date().toISOString()
            };

            const signature = this.generateSignature(payload);

            const response = await axios.get(`${this.baseUrl}/transaction-status`, {
                params: payload,
                headers: {
                    'X-API-Key': this.apiKey,
                    'X-Signature': signature
                }
            });

            return response.data;
        } catch (error) {
            console.error('UPI status check error:', error);
            throw new Error('Failed to get transaction status');
        }
    }

    // Validate UPI ID format
    validateUPIId(upiId) {
        const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
        return upiRegex.test(upiId);
    }
}

module.exports = new UPIService(); 