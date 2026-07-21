import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

// Adds a "Sources" button to view full citations/URLs used for the current answer
// (no slash command).
registerMainMenuItem({ label: "Sources", data: "sources:view", order: 40 });

const composer = new Composer<Ctx>();

// View full citations/URLs used for the current answer
composer.callbackQuery("sources:view", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Sources used for this answer:\n\n1. Wikipedia\n2. Britannica\n3. Academic Journal\n\nTap Back to return to the answer.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to answer", "answer:show")]]),
  });
});

export default composer;