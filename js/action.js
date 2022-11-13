
define_action("newplayer", (self) => {
  // item
  item_init_empty(8);
  item_gain(data_item_index("pick"), 1);
  item_gain(data_item_index("shovel"), 1);
});

define_action("inventory_next", (self) => {
  item_set_cursor(1);
});
define_action("inventory_prev", (self) => {
  item_set_cursor(-1);
});
define_action("inventory", (self) => {
  let text = "";
  for (let i = 0; i < $item.s.length; ++i) {
    if ($item.i === i) {
      text += ">";
    } else {
      text += " ";
    }
    text += "[" + i + "]";
    if ($item.s[i] != null) {
      const item = data_item($item.s[i].no);
      if (!item) {
        continue;
      }
      text += item.text + ":" + $item.s[i].num;
    }
    text += "\n";
  }
  text += "\n";
  {
    const slot = item_select();
    if (slot != null) {
      const item = data_item(slot.no);
      if (item != null) {
        text += item.desc + "\n";
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
  const item = item_select();
  if (!item) {
    return;
  }
  const data = data_item(item.no);
  if (!data) {
    return;
  }
  mob_set_hit(mob, data.hit, item.no);
});

define_action("activate", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }
  const hit = data_hit_index("activate");
  if (hit <= 0) {
    return;
  }
  mob_set_hit(mob, hit);
});

define_action("activate-target", (self) => {
  const mob = view_camera_mob();
  if (!mob) {
    return;
  }

  let text = "";
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
  cvs_text(self.cvs, text);
  gl_updateGLTexture2D(self.img, self.cvs);
});

define_action("hit-activate", (self) => {
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
    if (data.device) {
      action_invoke(tile, data.device.action);
    }
  }
});

define_action("hit-mining", (self) => {
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
      item_gain(data.mine.item, data.mine.count);
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
    item_lose(self.hit.item, count);
  }
});
