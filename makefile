
test-schemas:
	npm run test

schemas:
	docker run --rm -v $(pwd):/source ghcr.io/daanv2/jsonschemavalidationcompressor.net:v1.0.6 /source/source/compress_specification.json