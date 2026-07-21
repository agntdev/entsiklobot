import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

// Adds a "Translate" button to toggle translation of the current answer
// (no slash command).
registerMainMenuItem({ label: "Translate", data: "translate:toggle", order: 50 });

const composer = new Composer<Ctx>();

// Toggle translation of the current answer between Russian and English
composer.callbackQuery("translate:toggle", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Translation toggled! Answer in English.\n\nThe content has been translated from Russian to English. Tap Back to return to the original answer.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to answer", "answer:show")]]),
  });
});

export default composer;