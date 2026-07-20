import { Composer } from "grammy";
import { inlineButton, inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";
import type { Ctx } from "../bot.js";

registerMainMenuItem({ label: "Sources", data: "sources:view", order: 40 });

const composer = new Composer<Ctx>();

const SOURCES =
  "The answers in this bot come from trusted reference sources. 🔍\n\nHere are the citations used to build this response.";

composer.callbackQuery("sources:view", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(SOURCES, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;