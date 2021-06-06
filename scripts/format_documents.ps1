npx prettier --write "source/**/*.json" --config ./scripts/json.prettierrc.json
git add .
git commit -m "auto: Formatted json files"