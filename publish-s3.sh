#!/usr/bin/env bash
set \
  -o errexit \
  -o pipefail \
  -o nounset \
  -o verbose \
  -o errtrace

shopt -s \
  inherit_errexit \
  shift_verbose

xs=(
  grafast
  graphile-config
  graphile-build-pg
  dataplan__pg
)

for x in "${xs[@]}"; do
  aws s3 cp "builds/${x}.tgz" s3://latch-public/postgraphile/
done
