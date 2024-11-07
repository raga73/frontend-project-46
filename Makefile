install:
	npm ci
lint:
	npx eslint . --fix
publish:
	npm publish --dry-run
tests:
	npm test --watchAll
	npx jest --coverage

test-coverage:
	npm test --coverageProvider=v8
