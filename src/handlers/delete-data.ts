import { Composer } from "grammy";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

const DELETE =
  "Your session data has been cleared. 🗑️\n\nAll current information, questions, and answers have been removed from your session.";

composer.command("delete_data", async (ctx) => {
  await ctx.reply(DELETE, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;