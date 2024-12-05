import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
    }

    this.bot = new TelegramBot(token, { polling: true });

    this.setupListeners();
  }

  private setupListeners() {
    // Basic "start" command
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      await this.sendMiniAppButton(chatId);
    });

    // Handle custom messages
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      if (msg.text !== '/start') {
        this.bot.sendMessage(chatId, `You said: ${msg.text}`);
      }
    });
  }

  async sendMiniAppButton(chatId: number) {
    const miniAppUrl = this.configService.get<string>('TELEGRAM_MINI_APP_URL'); 
    if (!miniAppUrl) {
      throw new Error('TELEGRAM_MINI_APP_URL is not defined');
    }

    await this.bot.sendMessage(chatId, 'Explore our 3D Model Mini App using the button below!', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Open Mini App', // Button text
              web_app: { url: miniAppUrl }, // Button link to the Mini App
            },
          ],
        ],
      },
    });

    // Set the button as a persistent keyboard in the input field
    await this.bot.setChatMenuButton({
      chat_id: chatId,
      menu_button: {
        type: 'web_app',
        text: 'Open Mini App',
        web_app: { url: miniAppUrl },
      },
    });
  }

  async sendMessage(chatId: number, message: string): Promise<void> {
    await this.bot.sendMessage(chatId, message);
  }
}
