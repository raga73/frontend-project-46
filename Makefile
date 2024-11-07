install: deps-install
	npx simple-git-hooks

run:
	package.json

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-publish

.PHONY: test
