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
# one digits
run_test "$USER_CMD" "0" "0" "zero"
run_test "$USER_CMD" "1" "1" "one"
run_test "$USER_CMD" "2" "2" "two"
run_test "$USER_CMD" "3" "3" "three"
run_test "$USER_CMD" "4" "4" "four"
run_test "$USER_CMD" "5" "5" "five"
run_test "$USER_CMD" "6" "6" "six"
run_test "$USER_CMD" "7" "7" "seven"
run_test "$USER_CMD" "8" "8" "eight"
run_test "$USER_CMD" "9" "9" "nine"
# two digits
run_test "$USER_CMD" "10" "10" "ten"
run_test "$USER_CMD" "11" "11" "eleven"
run_test "$USER_CMD" "12" "12" "twelve"
run_test "$USER_CMD" "13" "13" "thirteen"
run_test "$USER_CMD" "14" "14" "fourteen"
run_test "$USER_CMD" "15" "15" "fifteen"
run_test "$USER_CMD" "16" "16" "sixteen"
run_test "$USER_CMD" "17" "17" "seventeen"
run_test "$USER_CMD" "18" "18" "eighteen"
run_test "$USER_CMD" "19" "19" "nineteen"
run_test "$USER_CMD" "20" "20" "twenty"
run_test "$USER_CMD" "25" "25" "twenty-five"
run_test "$USER_CMD" "27" "27" "twenty-seven"
run_test "$USER_CMD" "30" "30" "thirty"
run_test "$USER_CMD" "33" "33" "thirty-three"
run_test "$USER_CMD" "40" "40" "fourty"
run_test "$USER_CMD" "42" "42" "fourty-two"
run_test "$USER_CMD" "50" "50" "fifty"
run_test "$USER_CMD" "51" "51" "fifty-one"
run_test "$USER_CMD" "60" "60" "sixty"
run_test "$USER_CMD" "64" "64" "sixty-four"
run_test "$USER_CMD" "70" "70" "seventy"
run_test "$USER_CMD" "76" "76" "seventy-six"
run_test "$USER_CMD" "80" "80" "eighty"
run_test "$USER_CMD" "88" "88" "eighty-eight"
run_test "$USER_CMD" "90" "90" "ninety"
run_test "$USER_CMD" "99" "99" "ninety-nine"
# three digits
run_test "$USER_CMD" "100" "100" "one hundred"
run_test "$USER_CMD" "253" "253" "two hundred fifty-three"
run_test "$USER_CMD" "401" "401" "four hundred one"
run_test "$USER_CMD" "500" "500" "five hundred"
run_test "$USER_CMD" "678" "678" "six hundred seventy-eight"
run_test "$USER_CMD" "712" "712" "seven hundred twelve"

# negatives
run_test "$USER_CMD" "-0" "-0" "zero"
run_test "$USER_CMD" "-1" "-1" "negative one"
run_test "$USER_CMD" "-57" "-57" "negative fifty-seven"
run_test "$USER_CMD" "-100" "-100" "negative one hundred"
run_test "$USER_CMD" "-500" "-500" "negative five hundred"
run_test "$USER_CMD" "-678" "-678" "negative six hundred seventy-eight"
run_test "$USER_CMD" "-712" "-712" "negative seven hundred twelve"

# large numbers
run_test "$USER_CMD" "1000018" "1000018" "one million eighteen"
run_test "$USER_CMD" "4289794" "4289794" "four million two hundred eighty-nine thousand seven hundred ninety-four"
run_test "$USER_CMD" "658944" "658944" "six hundred fifty-eight thousand nine hundred fourty-four"
run_test "$USER_CMD" "8976433287" "8976433287" "eight billion nine hundred seventy-six million four hundred thirty-three thousand two hundred eighty-seven"
run_test "$USER_CMD" "100000000011" "100000000011" "one hundred billion eleven"
run_test "$USER_CMD" "66666666666" "66666666666" "sixty-six billion six hundred sixty-six million six hundred sixty-six thousand six hundred sixty-six"
