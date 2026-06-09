/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * PSP Notification Service
 * Sends payment notifications via Telegram Bot API 10.0
 */

import telegramAPI from './telegram'

export interface PaymentNotification {
  userId: number
  transactionId: string
  merchant: string
  amount: number
  currency: string
  status: 'approved' | 'pending' | 'declined'
  timestamp: Date
  receiptUrl?: string
}

export interface TransactionConfirmation {
  chatId: number
  transactionId: string
  amount: number
  merchant: string
  paymentMethod: string
}

export const notificationService = {
  /**
   * Send payment confirmation via Telegram
   * Uses inline keyboard for quick actions
   */
  async sendPaymentConfirmation(notification: PaymentNotification): Promise<void> {
    const statusEmoji = {
      approved: '✅',
      pending: '⏳',
      declined: '❌',
    }

    const message = `
${statusEmoji[notification.status]} Payment ${notification.status.toUpperCase()}

Transaction ID: \`${notification.transactionId}\`
Merchant: ${notification.merchant}
Amount: ${notification.currency} ${notification.amount.toLocaleString()}
Time: ${notification.timestamp.toLocaleString()}

Status: **${notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}**
    `.trim()

    try {
      await telegramAPI.sendMessage(notification.userId, message, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '📋 View Details',
                callback_data: `txn_${notification.transactionId}`,
              },
              {
                text: '🔗 Track Payment',
                url: `${process.env.REACT_APP_PAYMENT_TRACKING_URL}/${notification.transactionId}`,
              },
            ],
            notification.receiptUrl
              ? [
                  {
                    text: '📄 Download Receipt',
                    url: notification.receiptUrl,
                  },
                ]
              : [],
          ].filter((row) => row.length > 0),
        },
      })
    } catch (error) {
      console.error('Failed to send payment confirmation:', error)
      throw error
    }
  },

  /**
   * Send transaction confirmation poll
   * Allows user to confirm they received the payment
   */
  async sendTransactionConfirmationPoll(
    confirmation: TransactionConfirmation
  ): Promise<void> {
    const message = `
Did you receive the payment from ${confirmation.merchant}?
Amount: ${confirmation.amount.toLocaleString()} INR
Payment Method: ${confirmation.paymentMethod}
    `.trim()

    try {
      await telegramAPI.sendPoll(confirmation.chatId, message, ['Yes', 'No', 'Waiting'], {
        type: 'regular',
        is_anonymous: false,
        allows_multiple_answers: false,
      })
    } catch (error) {
      console.error('Failed to send confirmation poll:', error)
      throw error
    }
  },

  /**
   * Send guest notification (user not in bot's chat)
   * Uses guest mode to notify users about their payments
   */
  async sendGuestPaymentNotification(guestQueryId: string, notification: PaymentNotification): Promise<void> {
    const statusEmoji = {
      approved: '✅',
      pending: '⏳',
      declined: '❌',
    }

    const message = `
${statusEmoji[notification.status]} Your payment has been ${notification.status}!

Transaction: ${notification.transactionId}
Merchant: ${notification.merchant}
Amount: ${notification.amount} ${notification.currency}

Check your account for more details.
    `.trim()

    try {
      await telegramAPI.answerGuestQuery(guestQueryId, message)
    } catch (error) {
      console.error('Failed to send guest notification:', error)
      throw error
    }
  },

  /**
   * Send merchant alert for new transactions
   * Bot-to-bot communication for business automation
   */
  async sendMerchantAlert(
    merchantBotUsername: string,
    transactionId: string,
    amount: number,
    paymentMethod: string
  ): Promise<void> {
    const message = `
🔔 New Transaction Alert

ID: ${transactionId}
Amount: ${amount}
Method: ${paymentMethod}
Time: ${new Date().toISOString()}

Please confirm receipt.
    `.trim()

    try {
      await telegramAPI.sendMessageToBot(merchantBotUsername, message)
    } catch (error) {
      console.error('Failed to send merchant alert:', error)
      throw error
    }
  },

  /**
   * Send payment settlement summary
   * Daily/weekly settlement reports for merchants
   */
  async sendSettlementSummary(
    chatId: number,
    totalTransactions: number,
    totalAmount: number,
    successRate: number
  ): Promise<void> {
    const message = `
📊 Settlement Summary

Total Transactions: ${totalTransactions}
Total Amount: ₹${totalAmount.toLocaleString()}
Success Rate: ${successRate.toFixed(2)}%

All settlements have been processed.
Thank you for using OnTarget PSP!
    `.trim()

    try {
      await telegramAPI.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
      })
    } catch (error) {
      console.error('Failed to send settlement summary:', error)
      throw error
    }
  },

  /**
   * Send draft message (allows user to review before sending)
   * Useful for transaction confirmations
   */
  async sendPaymentDraft(chatId: number, amount: number, merchant: string): Promise<void> {
    const draftText = `Payment of ₹${amount} to ${merchant} approved. `

    try {
      await telegramAPI.sendMessageDraft(chatId, draftText)
    } catch (error) {
      console.error('Failed to send draft message:', error)
      throw error
    }
  },

  /**
   * Handle callback queries (button clicks)
   * Process user actions from inline buttons
   */
  processCallbackQuery(queryId: string, data: string): void {
    if (data.startsWith('txn_')) {
      const transactionId = data.slice(4)
      console.log(`User viewing transaction: ${transactionId}`)
      // Trigger transaction details view in app
      window.dispatchEvent(
        new CustomEvent('telegram-txn-view', {
          detail: { transactionId },
        })
      )
    }
  },
}

export default notificationService
