install:
	npm ci
lint:
	npx eslint . --fix
publish:
	npm publish --dry-run
