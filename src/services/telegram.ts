/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Telegram Bot API 10.0 Integration for OnTarget PSP
 * Supports guest mode, polls with media, live photos, and bot-to-bot communication
 */

const TELEGRAM_API_URL = process.env.REACT_APP_TELEGRAM_BOT_TOKEN
  ? `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_BOT_TOKEN}`
  : 'http://localhost:8081/bot'

interface TelegramUser {
  id: number
  is_bot: boolean
  first_name: string
  username?: string
  supports_guest_queries?: boolean
}

interface TelegramMessage {
  message_id: number
  from?: TelegramUser
  date: number
  chat: {
    id: number
    type: string
    title?: string
    username?: string
  }
  text?: string
  guest_bot_caller_user?: TelegramUser
  guest_bot_caller_chat?: { id: number }
  guest_query_id?: string
}

interface PollOption {
  text: string
  voter_count: number
  media?: {
    type: 'photo' | 'video'
    file_id: string
  }
}

interface TelegramPoll {
  id: string
  question: string
  options: PollOption[]
  total_voter_count: number
  is_closed: boolean
  is_anonymous: boolean
  type: 'regular' | 'quiz'
  allows_multiple_answers: boolean
  media?: {
    type: 'photo' | 'video'
    file_id: string
  }
  explanation_media?: {
    type: 'photo' | 'video'
    file_id: string
  }
  members_only?: boolean
  country_codes?: string[]
}

interface LivePhoto {
  photo: {
    file_id: string
    file_unique_id: string
    width: number
    height: number
    file_size: number
  }
  video: {
    file_id: string
    file_unique_id: string
    width: number
    height: number
    duration: number
    file_size: number
  }
}

export const telegramAPI = {
  // User Management
  async getMe() {
    const response = await fetch(`${TELEGRAM_API_URL}/getMe`)
    return response.json()
  },

  // Message Sending
  async sendMessage(chatId: number | string, text: string, options?: any) {
    return this._apiCall('sendMessage', {
      chat_id: chatId,
      text,
      ...options,
    })
  },

  async sendMessageDraft(chatId: number | string, text: string = '') {
    return this._apiCall('sendMessageDraft', {
      chat_id: chatId,
      text,
    })
  },

  // Guest Mode
  async answerGuestQuery(guestQueryId: string, text: string, options?: any) {
    return this._apiCall('answerGuestQuery', {
      guest_query_id: guestQueryId,
      text,
      ...options,
    })
  },

  // Polls
  async sendPoll(
    chatId: number | string,
    question: string,
    options: string[],
    pollOptions?: {
      is_anonymous?: boolean
      type?: 'regular' | 'quiz'
      allows_multiple_answers?: boolean
      media?: any
      explanation_media?: any
      members_only?: boolean
      country_codes?: string[]
    }
  ) {
    return this._apiCall('sendPoll', {
      chat_id: chatId,
      question,
      options,
      ...pollOptions,
    })
  },

  // Live Photos
  async sendLivePhoto(chatId: number | string, photoFile: string, videoFile: string, options?: any) {
    return this._apiCall('sendLivePhoto', {
      chat_id: chatId,
      photo: photoFile,
      video: videoFile,
      ...options,
    })
  },

  // Chat Management
  async getChatAdministrators(chatId: number | string, returnBots: boolean = false) {
    return this._apiCall('getChatAdministrators', {
      chat_id: chatId,
      return_bots: returnBots,
    })
  },

  async deleteAllMessageReactions(chatId: number | string, messageId: number) {
    return this._apiCall('deleteAllMessageReactions', {
      chat_id: chatId,
      message_id: messageId,
    })
  },

  async deleteMessageReaction(
    chatId: number | string,
    messageId: number,
    reaction: { type: 'emoji' | 'custom_emoji'; emoji?: string; custom_emoji_id?: string }
  ) {
    return this._apiCall('deleteMessageReaction', {
      chat_id: chatId,
      message_id: messageId,
      reaction,
    })
  },

  // Bot-to-Bot Communication
  async sendMessageToBot(botUsername: string, text: string, options?: any) {
    return this._apiCall('sendMessage', {
      chat_id: `@${botUsername}`,
      text,
      ...options,
    })
  },

  async replyToBot(botUsername: string, messageId: number, text: string, options?: any) {
    return this._apiCall('sendMessage', {
      chat_id: `@${botUsername}`,
      text,
      reply_to_message_id: messageId,
      ...options,
    })
  },

  // Bot Access Settings
  async getManagedBotAccessSettings(userId: number) {
    return this._apiCall('getManagedBotAccessSettings', {
      user_id: userId,
    })
  },

  async setManagedBotAccessSettings(userId: number, settings: any) {
    return this._apiCall('setManagedBotAccessSettings', {
      user_id: userId,
      settings,
    })
  },

  // User Personal Chat
  async getUserPersonalChatMessages(userId: number, limit: number = 100) {
    return this._apiCall('getUserPersonalChatMessages', {
      user_id: userId,
      limit,
    })
  },

  // Internal API call helper
  private async _apiCall(method: string, params: any) {
    try {
      const response = await fetch(`${TELEGRAM_API_URL}/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(`Telegram API error: ${data.description}`)
      }

      return data.result
    } catch (error) {
      console.error(`Telegram API error calling ${method}:`, error)
      throw error
    }
  },
}

export default telegramAPI
