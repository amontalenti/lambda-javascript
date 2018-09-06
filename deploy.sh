#!/bin/bash
rsync -Pavz --exclude=.git ./_build/slides/ root@amontalenti:/var/www/html/pub/lambda-javascript/
rsync -Pavz --exclude=.git ./_build/html/ root@amontalenti:/var/www/html/pub/lambda-javascript/notes/
