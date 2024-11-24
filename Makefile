install:
	npm ci
lint:
	npx eslint .
publish:
	npm publish --dry-run
tests:
	npm test --watchAll
	npx jest --coverage

test-coverage:
	npm test --coverage --coverageProvider
