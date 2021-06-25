prepare-release:
	yarn
	yarn lint
	yarn format-check
	yarn test
	yarn build
.PHONY: prepare-release

build-docs:
	npx rimraf ./docs
	npx typedoc --options ./typedoc.js  --media ./images
.PHONY: build-docs

publish-docs: build-docs
	rm -rf /tmp/persian-tools-docs | true
	mkdir /tmp/persian-tools-docs
	cp -r ./docs /tmp/persian-tools-docs
	cd /tmp/persian-tools-docs && \
	git clone --single-branch --branch gh-pages git@github.com:persian-tools/persian-tools.git && \
	cp -r /tmp/persian-tools-docs/docs/* /tmp/persian-tools-docs/persian-tools/ && \
	cd /tmp/persian-tools-docs/persian-tools && \
	git add --all && \
	git commit -m "doc: Update docs" && \
	git push origin gh-pages
	rm -rf ./docs
.PHONY: publish-docs
