# Scatter features note

The Mojang schema for these features is perfectly valid with a caveat: In scatter features, "x", "y", "z", "scatter_chance", and "iterations" can also
be numbers, as can the "extents" of any of the coordinates. Well, the extents are arrays, but their bounds can be numbers. Finally, note that anywhere
a block can be placed in features, a stateful notation can be used, as I describe here: https://wiki.bedrock.dev/concepts/biomes#block-types
