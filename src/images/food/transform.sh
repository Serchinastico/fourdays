#!/bin/bash
FILES=./*
for f in $FILES
do
  echo "Processing $f file..."
	convert $f -background white -gravity center -extent 300x300 $f
done
