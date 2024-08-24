#!/bin/bash
echo "testing.sh"
for f in **/*.$1
do
    [ -f "$f" ] && mv -v "$f" "${f%$1}$2"
done
