import mysql from 'mysql'

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "112233",
    database: 'clash_of_clans'
})

// 查询所有数据
export function queryAll(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
    })
}

// 前期数据生成用（后期建表和插入数据不需要）
/* export function exec(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) return reject(err)
            resolve(results)
        })
  
    })
} */


