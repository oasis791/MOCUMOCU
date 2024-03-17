#!/bin/bash

# 데이터베이스 접속 정보 설정
DB_NAME="mocumocu"
DB_CONF="~/my.cnf"

# 더미 데이터 삽입을 위한 변수 초기화
i=1
c=1
VALUES=""

while [ $c -le 5000 ]; do
    m=1
    while [ $m -le 500 ]; do
        # INSERT 명령어 구성
        VALUES="$VALUES(0, $i, $i, $c, $m, NULL, NULL),"
        m=$((m + 1))
        i=$((i + 1))

        # 한 번에 삽입할 데이터 수 제한 (예: 1000개의 데이터마다 쿼리 실행)
        if [ $((i % 1000)) -eq 0 ] || [ $c -eq 5000 ] && [ $m -eq 500 ]; then
            # 마지막 콤마 제거
            VALUES=${VALUES%?}

            # MySQL 명령어 실행
            SQL="SET foreign_key_checks = 0; INSERT INTO COUPON(amount_stamp, coupon_id, couponlog_id, customer_id, market_id, board_url, stamp_url) VALUES $VALUES;"
            mysql --defaults-file=$DB_CONF $DB_NAME -e "$SQL"

            # VALUES 초기화
            VALUES=""
        fi
    done
    c=$((c + 1))
done

echo "250만개의 더미 데이터 삽입 완료!"
