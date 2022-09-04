
define_action("makeworld", (self) => {
    const b = data_tile_index("tile");
    const m = data_tile_index("mine");

    // tile
    tile_init_empty(64, 64);
    for(let x=24; x<=40; ++x) {
        for(let y=24; y<=40; ++y) {
            tile_base_set(x, y, b);
        }
    }
    tile_prop_set(24, 24, m);
    tile_prop_set(29, 29, m);
    tile_prop_set(35, 29, m);
    tile_prop_set(29, 35, m);
    tile_prop_set(35, 35, m);

    // pos
    pos_init($tile.w/2 + 0.5, $tile.h/2 + 0.5);

    // item
    item_init_empty(8);
    item_gain(data_item_index("pick"), 1);
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

define_action("activate", (self) => {
    const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
    hit_activate(ranges);
});

define_action("activate-target", (self) => {
    let text = "";
    const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
    for(const r of ranges) {
        const tile = tile_prop(r.x, r.y);
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
