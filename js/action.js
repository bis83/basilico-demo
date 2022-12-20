
define_action("nextview", (self, view) => {
  view_next(view);
});

define_action("newgame", (self) => {
  newgame();
});

define_action("loadgame", (self) => {
  loadgame();
});

define_action("savegame", (self) => {
  savegame();
});

define_action("fpsmove", (self, lstick, rstick) => {
  const moveXY = com_value(lstick);
  const cameraXY = com_value(rstick);
  mob_fps_movement(self, moveXY, cameraXY);
});

define_action("newgrid", (self, name) => {
  const no = data_grid_index(name);
  if (no <= 0) {
    return;
  }
  grid_load(no);
});

define_action("inventory_next", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  item_set_cursor(mob.item, 1);
});
define_action("inventory_prev", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  item_set_cursor(mob.item, -1);
});
define_action("inventory", (self) => {
  let text = "";
  const mob = view_camera_mob();
  if (mob) {
    {
      const data = data_mob(mob.no);
      if (!data) {
        return;
      }
      const mhp = data.hp;
      const hp = Math.max(0, mhp - mob.dmg);
      text += "HP: " + hp + "/" + mhp;
      text += "\n";
    }
    text += "\n";
    for (let i = 0; i < mob.item.s.length; ++i) {
      if (mob.item.i === i) {
        text += ">";
      } else {
        text += " ";
      }
      text += "[" + i + "]";
      if (mob.item.s[i] != null) {
        const item = data_item(mob.item.s[i].no);
        if (!item) {
          continue;
        }
        text += item.text + ":" + mob.item.s[i].n;
      }
      text += "\n";
    }
    text += "\n";
    {
      const slot = item_select(mob.item);
      if (slot != null) {
        const item = data_item(slot.no);
        if (item != null) {
          text += item.desc + "\n";
        }
      }
    }
  }
  cvs_text(self.cvs, text);
  gl_updateGLTexture2D(self.img, self.cvs);
});

define_action("hand", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  mob.hit.act = true;
});

define_action("activate", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  const ranges = hit_ranges(mob.x, mob.y, mob.ha);
  for (const r of ranges) {
    const tile = grid_tile(r.x, r.y);
    if (!tile) {
      continue;
    }
    const data = data_tile(tile.no);
    if (!data) {
      continue;
    }
    if (data.device) {
      action_invoke(tile, data.device.action);
    }
  }
});

define_action("activate-target", (self) => {
  let text = "";
  const mob = view_camera_mob();
  if (mob) {
    const ranges = hit_ranges(mob.x, mob.y, mob.ha);
    for (const r of ranges) {
      const tile = grid_tile(r.x, r.y);
      if (!tile) {
        continue;
      }
      const data = data_tile(tile.no);
      if (!data) {
        continue;
      }
      text += data.desc;
      text += "\n";
    }
  }
  cvs_text(self.cvs, text);
  gl_updateGLTexture2D(self.img, self.cvs);
});

define_action("hit-mining", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  const ranges = hit_ranges(self.x, self.y, self.ha);
  for (const r of ranges) {
    const tile = grid_tile(r.x, r.y);
    if (!tile) {
      continue;
    }
    const data = data_tile(tile.no);
    if (!data) {
      continue;
    }
    if (data.mine) {
      item_gain(mob.item, data.mine.item, data.mine.count);
      tile_del(tile);
    }
  }
});

define_action("hit-dig", (self) => {
  const ranges = hit_ranges(self.x, self.y, self.ha);
  for (const r of ranges) {
    const tile = grid_tile(r.x, r.y);
    if (tile_is_empty(tile)) {
      continue;
    }
    if (tile_is_full(tile)) {
      continue;
    }
    tile_base_pop(tile);
  }
});

define_action("hit-put", (self, base) => {
  const value = data_base_index(base);
  if (value <= 0) {
    return;
  }
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  const ranges = hit_ranges(self.x, self.y, self.ha);
  let count = 0;
  for (const r of ranges) {
    const tile = grid_tile(r.x, r.y);
    if (tile_is_full(tile)) {
      continue;
    }
    tile_base_push(tile, value);
    count += 1;
  }
  if (self.hit.item > 0 && count > 0) {
    item_lose(mob.item, self.hit.item, count);
  }
});

define_action("hit-damage", (self) => {
  const ranges = hit_ranges(self.x, self.y, self.ha);
  const targets = grid_mob_ranges(ranges);
  for (const mob of targets) {
    mob_damage(mob, 1);
  }
});

define_action("giveup", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  mob_damage(mob, 9999);
});

define_action("gameover", (self, next) => {
  const mob = view_camera_mob();
  if (!mob) {
    view_next(next);
  }
});
