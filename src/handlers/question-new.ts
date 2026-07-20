import { Composer } from "grammy";
import { inlineButton, inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";
import type { Ctx } from "../bot.js";

registerMainMenuItem({ label: "New question", data: "question:new", order: 20 });

const composer = new Composer<Ctx>();

const NEW_QUESTION =
  "Sure, let's try a new question. 🔄\n\nType your question or pick a topic below.";

composer.callbackQuery("question:new", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(NEW_QUESTION, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;