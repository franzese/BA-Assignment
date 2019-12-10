#!/bin/bash

#set -xeo pipefail

function log_success() {
  echo "Success: $1"
}

function log_failure() {
  echo "FAIL: $1. Expected '$2'. $3"
}

function run_test() {
  local cmd=$1
  local test_name=$2
  local test_input=$3
  local expected_output=$4

  local actual_output=$($cmd $test_input)
  local returncode=$?
  if [ "$returncode" != "0" ]; then
    log_failure "$test_name" "$expected_output" "Return code $returncode. Command $cmd $test_input. Output: '$actual_output'"
EOF
  elif [ "$actual_output" = "$expected_output" ]; then
    log_success "$test_name"
  else
    log_failure "$test_name" "$expected_output" "Command $cmd $test_input. Output: '$actual_output'"
  fi
}

export USER_CMD="$@"
run_test "$USER_CMD" "0" "0" "zero"
run_test "$USER_CMD" "1" "1" "one"
run_test "$USER_CMD" "-2" "-1" "negative one"
run_test "$USER_CMD" "17" "17" "seventeen"
run_test "$USER_CMD" "1000018" "1000018" "one million eighteen"
