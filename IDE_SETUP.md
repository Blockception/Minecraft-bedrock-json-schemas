# IDE Setup Guide

This guide provides instructions for setting up Minecraft Bedrock JSON schemas in various IDEs and editors.

## Table of Contents

- [Neovim with LSP](#neovim-with-lsp)
- [Visual Studio Code](#visual-studio-code)
- [JetBrains IDEs](#jetbrains-ides)
- [Sublime Text](#sublime-text)

---

## Neovim with LSP

To use these JSON schemas with Neovim and the `jsonls` language server, you need to configure your LSP setup.

### Prerequisites

- Neovim with LSP support
- `nvim-lspconfig` plugin
- `jsonls` language server installed

### Configuration

Add the following to your Neovim LSP configuration (typically in `~/.config/nvim/lua/lsp/jsonls.lua` or your LSP config file):

```lua
local lspconfig = require('lspconfig')

lspconfig.jsonls.setup({
  settings = {
    json = {
      schemas = {
        -- General schemas
        {
          description = "Minecraft Bedrock Manifest",
          fileMatch = { "manifest.json", "manifest.jsonc", "manifest.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/general/manifest.json"
        },
        {
          description = "Minecraft Bedrock World Packs",
          fileMatch = { "world_behavior_packs.json", "world_behavior_packs.jsonc", "world_behavior_packs.json5", "world_resource_packs.json", "world_resource_packs.jsonc", "world_resource_packs.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/general/world_x_packs.json"
        },
        
        -- Language schemas
        {
          description = "Minecraft Bedrock Language Names",
          fileMatch = { "language_names.json", "language_names.jsonc", "language_names.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/language/language_names.json"
        },
        {
          description = "Minecraft Bedrock Languages",
          fileMatch = { "languages.json", "languages.jsonc", "languages.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/language/languages.json"
        },
        
        -- Skin pack schemas
        {
          description = "Minecraft Bedrock Skin Pack",
          fileMatch = { "skin_pack/skins.json", "skin_pack/skins.jsonc", "skin_pack/skins.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/skinpacks/skins.json"
        },
        
        -- Resource Pack schemas
        {
          description = "Minecraft Bedrock Resource Pack Animation Controllers",
          fileMatch = {
            "resource_packs/*/animation_controllers/*.json",
            "resource_packs/*/animation_controllers/*.jsonc",
            "resource_packs/*/animation_controllers/*.json5",
            "*resource*pack*/animation_controllers/*.json",
            "*resource*pack*/animation_controllers/*.jsonc",
            "*resource*pack*/animation_controllers/*.json5",
            "*Resource*Pack*/animation_controllers/*.json",
            "*RP*/animation_controllers/*.json",
            "*rp*/animation_controllers/*.json",
            "*.animation_controller.rp.json",
            "*.rpac.json",
            "*.ac.rp.json",
            "*.rp_ac.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/animation_controllers/animation_controller.json"
        },
        {
          description = "Minecraft Bedrock Resource Pack Animations",
          fileMatch = {
            "resource_packs/*/animations/*.json",
            "*resource*pack*/animations/*.json",
            "*Resource*Pack*/animations/*.json",
            "*RP*/animations/*.json",
            "*rp*/animations/*.json",
            "*.animation.rp.json",
            "*.anim.rp.json",
            "*.a.rp.json",
            "*.rpa.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/animations/actor_animation.json"
        },
        {
          description = "Minecraft Bedrock Attachables",
          fileMatch = {
            "attachables/*.json",
            "*.attachable.json",
            "*.attach.json",
            "*.at.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/attachables/attachables.json"
        },
        {
          description = "Minecraft Bedrock Client Biomes",
          fileMatch = { "biomes_client.json", "biomes_client.jsonc", "biomes_client.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/biomes_client.json"
        },
        {
          description = "Minecraft Bedrock Resource Blocks",
          fileMatch = { "blocks.json", "blocks.jsonc", "blocks.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/blocks.json"
        },
        {
          description = "Minecraft Bedrock Client Entity",
          fileMatch = {
            "entity/*.json",
            "*.entity.rp.json",
            "*.e.rp.json",
            "*.ce.json",
            "*.rpe.json",
            "*.entity.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/entity/entity.json"
        },
        {
          description = "Minecraft Bedrock Fogs",
          fileMatch = {
            "fogs/*.json",
            "*.fog.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/fog/fog.json"
        },
        {
          description = "Minecraft Bedrock Flipbook Textures",
          fileMatch = { "flipbook_textures.json", "flipbook_textures.jsonc", "flipbook_textures.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/textures/flipbook_textures.json"
        },
        {
          description = "Minecraft Bedrock Item Texture",
          fileMatch = { "item_texture.json", "item_texture.jsonc", "item_texture.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/textures/item_texture.json"
        },
        {
          description = "Minecraft Bedrock Texture List",
          fileMatch = { "texture_list.json", "texture_list.jsonc", "texture_list.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/textures/texture_list.json"
        },
        {
          description = "Minecraft Bedrock Resource Pack Items",
          fileMatch = {
            "resource_packs/*/items/*.json",
            "*resource*pack*/items/*.json",
            "*RP*/items/*.json",
            "*.item.rp.json",
            "*.i.rp.json",
            "*.rpi.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/items/items.json"
        },
        {
          description = "Minecraft Bedrock Entity Models",
          fileMatch = {
            "models/entity/*.json",
            "*.geo.json",
            "*.geometry.json",
            "*.model.json",
            "*.g.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/models/entity/model_entity.json"
        },
        {
          description = "Minecraft Bedrock Materials",
          fileMatch = { "materials/*.material" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/materials/materials.json"
        },
        {
          description = "Minecraft Bedrock Music Definitions",
          fileMatch = { "music_definitions.json" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/sounds/music_definitions.json"
        },
        {
          description = "Minecraft Bedrock Particles",
          fileMatch = {
            "particles/*.json",
            "*.particle.json",
            "*.p.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/particles/particles.json"
        },
        {
          description = "Minecraft Bedrock Render Controllers",
          fileMatch = {
            "render_controllers/*.json",
            "*.render.json",
            "*.render_controller.json",
            "*.rc.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/render_controllers/render_controllers.json"
        },
        {
          description = "Minecraft Bedrock Sound Definitions",
          fileMatch = { "sound_definitions.json", "sound_definitions.jsonc", "sound_definitions.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/sounds/sound_definitions.json"
        },
        {
          description = "Minecraft Bedrock Sounds",
          fileMatch = { "sounds.json", "sounds.jsonc", "sounds.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/sounds.json"
        },
        {
          description = "Minecraft Bedrock Terrain Texture",
          fileMatch = { "terrain_texture.json", "terrain_texture.jsonc", "terrain_texture.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/textures/terrain_texture.json"
        },
        
        -- Behavior Pack schemas
        {
          description = "Minecraft Bedrock Behavior Pack Animation Controllers",
          fileMatch = {
            "behavior_packs/*/animation_controllers/*.json",
            "*behavior*pack*/animation_controllers/*.json",
            "*Behavior*Pack*/animation_controllers/*.json",
            "*BP*/animation_controllers/*.json",
            "*bp*/animation_controllers/*.json",
            "*.animation_controller.bp.json",
            "*.bpac.json",
            "*.ac.bp.json",
            "*.bp_ac.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/animation_controllers/animation_controller.json"
        },
        {
          description = "Minecraft Bedrock Behavior Pack Animations",
          fileMatch = {
            "behavior_packs/*/animations/*.json",
            "*behavior*pack*/animations/*.json",
            "*BP*/animations/*.json",
            "*.animation.bp.json",
            "*.anim.bp.json",
            "*.a.bp.json",
            "*.bpa.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/animations/animations.json"
        },
        {
          description = "Minecraft Bedrock Biomes",
          fileMatch = {
            "behavior_packs/*/biomes/*.json",
            "*behavior*pack*/biomes/*.json",
            "*BP*/biomes/*.json",
            "*.biome.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/biomes/biomes.json"
        },
        {
          description = "Minecraft Bedrock Dialogue",
          fileMatch = {
            "behavior_packs/*/dialogue/*.json",
            "*behavior*pack*/dialogue/*.json",
            "*BP*/dialogue/*.json",
            "*.diag.json",
            "*.dialogue.json",
            "*.dialog.json",
            "*.d.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/dialogue/dialogue.json"
        },
        {
          description = "Minecraft Bedrock Function Tick",
          fileMatch = { "functions/tick.json", "functions/tick.jsonc", "functions/tick.json5" },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/functions/tick.json"
        },
        {
          description = "Minecraft Bedrock Loot Tables",
          fileMatch = {
            "behavior_packs/*/loot_tables/*.json",
            "*behavior*pack*/loot_tables/*.json",
            "*BP*/loot_tables/*.json",
            "*.loot.json",
            "*.loot_table.json",
            "*.lt.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/loot_tables/loot_tables.json"
        },
        {
          description = "Minecraft Bedrock Behavior Blocks",
          fileMatch = {
            "behavior_packs/*/blocks/*.json",
            "*behavior*pack*/blocks/*.json",
            "*BP*/blocks/*.json",
            "*.block.json",
            "*.b.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/blocks/blocks.json"
        },
        {
          description = "Minecraft Bedrock Behavior Entities",
          fileMatch = {
            "behavior_packs/*/entities/*.json",
            "*behavior*pack*/entities/*.json",
            "*BP*/entities/*.json",
            "*.entity.bp.json",
            "*.e.bp.json",
            "*.se.json",
            "*.bpe.json",
            "*.behavior.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/entities/entities.json"
        },
        {
          description = "Minecraft Bedrock Features",
          fileMatch = {
            "behavior_packs/*/features/*.json",
            "*behavior*pack*/features/*.json",
            "*BP*/features/*.json",
            "*.feature.json",
            "*.f.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/features/features.json"
        },
        {
          description = "Minecraft Bedrock Feature Rules",
          fileMatch = {
            "behavior_packs/*/feature_rules/*.json",
            "*behavior*pack*/feature_rules/*.json",
            "*BP*/feature_rules/*.json",
            "*.feature_rule.json",
            "*.fr.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/feature_rules/feature_rules.json"
        },
        {
          description = "Minecraft Bedrock Behavior Pack Items",
          fileMatch = {
            "behavior_packs/*/items/*.json",
            "*behavior*pack*/items/*.json",
            "*BP*/items/*.json",
            "*.item.bp.json",
            "*.i.bp.json",
            "*.bpi.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/items/items.json"
        },
        {
          description = "Minecraft Bedrock Recipes",
          fileMatch = {
            "recipes/*.json",
            "*.recipe.json",
            "*.crafting_recipe.json",
            "*.cr.json",
            "*.r.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/recipes/recipes.json"
        },
        {
          description = "Minecraft Bedrock Spawn Rules",
          fileMatch = {
            "spawn_rules/*.json",
            "*.spawn.json",
            "*.sr.json",
            "*.spawn_rule.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/spawn_rules/spawn_rules.json"
        },
        {
          description = "Minecraft Bedrock Trading",
          fileMatch = {
            "behavior_packs/*/trading/*.json",
            "*behavior*pack*/trading/*.json",
            "*BP*/trading/*.json",
            "*.trade.json",
            "*.trade_table.tt.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/trading/trading.json"
        },
        {
          description = "Minecraft Bedrock Volumes",
          fileMatch = {
            "behavior_packs/*/volumes/*.json",
            "*behavior*pack*/volumes/*.json",
            "*BP*/volumes/*.json",
            "*.volume.json"
          },
          url = "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/volumes/volumes.json"
        }
      }
    }
  }
})
```

### Tips for Neovim

1. **Simplified File Patterns**: The example configuration above shows simplified file patterns for readability. The patterns handle `.json` files. If you also need to match `.jsonc` or `.json5` files, you can add those extensions to the fileMatch arrays (e.g., `"manifest.jsonc"`, `"manifest.json5"`).

2. **Simplified Configuration**: If you only work with specific file types, you can reduce the schema list to only include the ones you need.

3. **Using with lazy.nvim**: If you're using lazy.nvim, you can add this configuration in your LSP plugin setup:

```lua
{
  'neovim/nvim-lspconfig',
  config = function()
    require('lspconfig').jsonls.setup({
      -- Your schemas configuration here
    })
  end
}
```

4. **File Pattern Matching**: The `fileMatch` patterns support glob patterns. If your file naming conventions differ, adjust the patterns accordingly.

---

## Visual Studio Code

Visual Studio Code is the primary supported editor for these schemas.

### Setup

1. Copy the `vscode-settings.json` file from the repository root into your project's `.vscode` folder
2. Rename it to `settings.json`

**OR**

1. Copy the contents of `vscode-settings.json` into your `.code-workspace` file under the `settings` property:

```json
{
  "folders": [
    {
      "path": "."
    }
  ],
  "settings": {
    "json.schemas": [
      
    ]
  }
}
```

**Note**: Replace the empty `json.schemas` array above with the complete array from the `vscode-settings.json` file. The array should contain all the schema definitions (each with `fileMatch` and `url` properties).

The schemas will automatically apply to matching files in your workspace.

---

## JetBrains IDEs

JetBrains IDEs (IntelliJ IDEA, WebStorm, PyCharm, etc.) support JSON schemas through their built-in JSON Schema support.

### Setup

1. Open **Settings/Preferences** → **Languages & Frameworks** → **Schemas and DTDs** → **JSON Schema Mappings**
2. Click the **+** button to add a new schema mapping
3. For each schema you want to use:
   - **Name**: Give it a descriptive name (e.g., "Minecraft Bedrock Manifest")
   - **Schema file or URL**: Enter the raw GitHub URL (e.g., `https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/general/manifest.json`)
   - **Schema version**: Select "JSON Schema version 7" (or latest)
   - **File path pattern**: Add file patterns that should use this schema (e.g., `manifest.json`)

### Common Schema Mappings

Here are some common mappings you might want to add:

- **Manifest files**: `https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/general/manifest.json`
  - Pattern: `manifest.json`
  
- **Entity files (Behavior)**: `https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/entities/entities.json`
  - Pattern: `behavior_packs/*/entities/*.json` or `*.entity.bp.json`
  
- **Entity files (Resource)**: `https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/resource/entity/entity.json`
  - Pattern: `resource_packs/*/entity/*.json` or `*.entity.rp.json`

---

## Sublime Text

Sublime Text supports JSON schemas through the LSP package.

### Prerequisites

- Install [Package Control](https://packagecontrol.io/installation)
- Install the [LSP package](https://packagecontrol.io/packages/LSP)
- Install [LSP-json](https://packagecontrol.io/packages/LSP-json)

### Setup

1. Open **Preferences** → **Package Settings** → **LSP** → **Settings**
2. Add the following to your LSP settings:

```json
{
  "clients": {
    "LSP-json": {
      "enabled": true,
      "settings": {
        "json": {
          "schemas": [
            {
              "fileMatch": ["manifest.json"],
              "url": "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/general/manifest.json"
            },
            {
              "fileMatch": ["behavior_packs/*/entities/*.json", "*.entity.bp.json"],
              "url": "https://raw.githubusercontent.com/Blockception/Minecraft-bedrock-json-schemas/main/behavior/entities/entities.json"
            }
          ]
        }
      }
    }
  }
}
```

Note: Add more schema objects to the `schemas` array as needed, following the same pattern as the examples above.

---

## Additional Resources

- [Main Repository](https://github.com/Blockception/Minecraft-bedrock-json-schemas)
- [Contributing Guide](CONTRIBUTING.md)
- [VS Code Settings Reference](vscode-settings.json)

For a complete list of all available schemas and their URLs, refer to the [vscode-settings.json](vscode-settings.json) file in the repository root.

---

## Troubleshooting

### Schemas not loading

- Verify the schema URLs are accessible (check if GitHub is reachable)
- Ensure file patterns match your actual file names
- Check your editor's developer console/logs for errors

### Autocomplete not working

- Make sure your language server is running correctly
- Verify the file is recognized as JSON (check the file type/language mode)
- Try restarting your editor or language server

### Schema validation errors

- Ensure you're using the correct schema for your file type
- Check that your JSON is valid (use a JSON validator)
- Verify you're using a compatible Minecraft Bedrock format version
