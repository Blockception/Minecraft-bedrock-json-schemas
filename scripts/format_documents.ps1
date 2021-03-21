git add .
git commit

npx prettier --write "source/**/*.json" --config ./scripts/json.prettierrc.json
git submodule foreach git add **/*.json
git submodule foreach git commit -m "auto: Formatted json files"
git add **/*.json
git commit -m "auto: Formatted json files"