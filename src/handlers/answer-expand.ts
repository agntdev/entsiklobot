import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

// Adds a "More details" button to expand the current answer into a longer explanation
// (no slash command).
registerMainMenuItem({ label: "More details", data: "answer:expand", order: 30 });

const composer = new Composer<Ctx>();

// Expand the current answer into a longer explanation
composer.callbackQuery("answer:expand", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Here's an expanded explanation of the answer:\n\nAdditional details and context have been added to provide a more comprehensive understanding.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to answer", "answer:show")]]),
  });
});

export default composer;