import { Composer } from "grammy";
import { inlineButton, inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";
import type { Ctx } from "../bot.js";

registerMainMenuItem({ label: "More details", data: "answer:expand", order: 30 });

const composer = new Composer<Ctx>();

const EXPAND =
  "Here's the expanded explanation. 📚\n\nI hope this gives you a clearer picture of the topic.";

composer.callbackQuery("answer:expand", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(EXPAND, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;