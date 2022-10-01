
define_action("makeworld", (self) => {
    const b = data_tile_index("dirt-tile");
    const m0 = data_tile_index("rock-mine");
    const m1 = data_tile_index("sand-mine");
    const s = data_tile_index("savepoint");

    // tile
    tile_init_empty(64, 64);
    for(let x=24; x<=40; ++x) {
        for(let y=24; y<=40; ++y) {
            tile_base_push(tile_get(x, y), b);
        }
    }
    tile_set(tile_get(24, 24), m0);
    tile_set(tile_get(29, 29), m1);
    tile_set(tile_get(35, 29), m0);
    tile_set(tile_get(29, 35), m1);
    tile_set(tile_get(35, 35), m0);
    tile_set(tile_get(30, 30), s, 45);

    // pos
    pos_init($tile.w/2 + 0.5, $tile.h/2 + 0.5);

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
    for(let i=0; i<$item.s.length; ++i) {
        if($item.i === i) {
            text += ">";
        } else {
            text += " ";
        }
        text += "[" + i + "]";
        if($item.s[i] != null) {
            const item = data_item($item.s[i].no);
            if(!item) {
                continue;
            }
            text += item.text + ":" + $item.s[i].num;
        }
        text += "\n";
    }
    text += "\n";
    {
        const slot = item_select();
        if(slot != null) {
            const item = data_item(slot.no);
            if(item != null) {
                text += item.desc + "\n";
            }
        }
    }
    cvs_text(self.cvs, text);
    gl_updateGLTexture2D(self.img, self.cvs);
});

define_action("hand", (self) => {
    const item = item_select();
    if(!item) {
        return;
    }
    const data = data_item(item.no);
    if(!data) {
        return;
    }
    if(data.hand) {
        const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
        hit(data.hand.hit, 0, ranges);
    }
    if(data.tile) {
        const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
        const result = hit(HIT_PUT, data.tile.tile, ranges);
        if(result > 0) {
            item_lose(item.no, result);
        }
    }
});

define_action("off-hand", (self) => {
});

define_action("activate", (self) => {
    const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
    hit(HIT_ACTIVATE, 0, ranges);
});

define_action("activate-target", (self) => {
    let text = "";
    const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
    for(const r of ranges) {
        const tile = tile_get(r.x, r.y);
        if(!tile) {
            continue;
        }
        const data = data_tile(tile.no);
        if(!data) {
            continue;
        }
        text += data.desc;
        text += "\n";
    }
    cvs_text(self.cvs, text);
    gl_updateGLTexture2D(self.img, self.cvs);
});
