import { Composer } from "grammy";
import { inlineButton, inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";
import type { Ctx } from "../bot.js";

registerMainMenuItem({ label: "Translate", data: "translate:toggle", order: 50 });

const composer = new Composer<Ctx>();

const TOGGLE =
  "Translation has been toggled. 🌐\n\nIf you'd like to change your preferred language permanently, please ask an admin.";

composer.callbackQuery("translate:toggle", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(TOGGLE, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;