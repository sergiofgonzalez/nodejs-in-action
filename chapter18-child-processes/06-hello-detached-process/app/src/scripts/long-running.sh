#!/bin/bash

for i in $(seq 0 100)
do
  printf -v padded_i "%03d" ${i}
  echo Iteration: $padded_i @ $(date --rfc-2822) >> execution-log.txt
  sleep 1
done
