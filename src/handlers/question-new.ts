import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

// Adds a "New question" button to the /start main menu to reset session and prompt
// for a new question (no slash command).
registerMainMenuItem({ label: "New question", data: "question:new", order: 20 });

const composer = new Composer<Ctx>();

// Reset session and prompt for a new question
composer.callbackQuery("question:new", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Ready for a new question. Please ask anything!", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;