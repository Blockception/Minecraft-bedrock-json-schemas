"replaceable_blocks": array of block references or stateful objects, required even if empty (but useless if empty),  
"ground_block": block reference, required  
"waterlogged": boolean, opt, defaults to false,

"surface": string: "floor"|"ceiling", opt, defaults to "floor"  
"horizontal_radius": int (maybe floats work but are probably truncated), required, must be 0 or greater for feature to work, but no error is thrown if
negative is given  
"vertical_range": int >= 0, required, values below 0 clamped,  
"depth": int, required, typically 1+, 0 acts like 1, negative values do have functionality, though: continue downward indefinitely until hitting an
invalid block or world boundary,  
"extra_deep_block_chance": float, [0, 1], values above or below clamped, opt, defaults to 0  
"extra_edge_column_chance": float, [0, 1], values above or below clamped, opt, defaults to 0

"vegetation_feature": feature reference, required, doesn't do anything when vegetation_chance is 0 or less,  
"vegetation_chance": float, [0, 1], values above or below clamped, opt, defaults to 0
