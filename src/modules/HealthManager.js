import APIManager from "./APIManager";

const MAX_HEALTH = 10;
const DEAD = 0;

const COMPLETE = 1;
const ABANDON = -2;
const FAIL = -3;

export default {
  async onComplete(id) {
    const character = await APIManager.get(`characters/${id}`);

    const newHealth =
      Number(character.health) + COMPLETE >= MAX_HEALTH
        ? MAX_HEALTH
        : Number(character.health) + COMPLETE;
    character.health !== DEAD &&
      (await APIManager.update(`characters`, {
        ...character,
        health: newHealth
      }));
  },
  async onAbandon(id) {
    const character = await APIManager.get(`characters/${id}`);
    const newHealth =
      Number(character.health) + ABANDON <= DEAD
        ? DEAD
        : Number(character.health) + ABANDON;
    character.health !== DEAD &&
      (await APIManager.update(`characters`, {
        ...character,
        health: newHealth
      }));
  },
  async onFail(id) {
    const character = await APIManager.get(`characters/${id}`);
    const newHealth =
      Number(character.health) + FAIL <= DEAD
        ? DEAD
        : Number(character.health) + FAIL;
    character.health !== DEAD &&
      (await APIManager.update(`characters`, {
        ...character,
        health: newHealth
      }));
  }
};
