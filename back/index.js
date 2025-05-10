import express from 'express'
import cors from 'cors'
import { readdir } from 'fs/promises'
// import { exec } from './db.js'
// const sqlStr = 'insert into troops(name, path, container, category) values(?, ?, ?, ?)'

import { queryAll } from './db.js'
const app = express()
app.use(express.json())
app.use(cors())

app.listen(3000, () => { 
    console.log('Server is running at port 3000') 
})

app.get('/getAllTroops', async (req, res) => {
    const sql = 'SELECT * FROM troops'
    try {
        queryAll(sql).then((results) => {
            res.json(results) 
        })
    } catch (err) {
        console.log(err) 
    }
})

// 前期数据生成用，插入数据库（后期建表和插入数据不需要）
/* app.get('/magics', async (req, res) => {
    const target_dir = '../clash_of_clans_picker/public/images/magics'
    try {
        const pngFiles = await getAllPngFiles(target_dir)
        res.json(pngFiles)
    }catch (err) {
        console.log(err)
    }
})

app.get('/troops', async (req, res) => {
    const target_dir = '../clash_of_clans_picker/public/images/troops'
    try {
        const pngFiles = await getAllPngFiles(target_dir)
        res.json(pngFiles)
    }catch (err) {
        console.log(err)
    }
})

app.get('/machines', async (req, res) => {
    const target_dir = '../clash_of_clans_picker/public/images/machines'
    try {
        const pngFiles = await getAllPngFiles(target_dir)
        res.json(pngFiles)
    }catch (err) {
        console.log(err)
    }
})

app.get('/super_troops', async (req, res) => {
    const target_dir = '../clash_of_clans_picker/public/images/super_troops'
    try {
        const pngFiles = await getAllPngFiles(target_dir)
        res.json(pngFiles)
    }catch (err) {
        console.log(err)
    }
})

async function getAllPngFiles(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    return entries
      .filter(e => e.isFile() && e.name.toLowerCase().endsWith('.png'))
      .map(e => {
        const match = e.name.match(/^[^-]+-([^.]+)\.png$/)
        const name = match ? match[1] : e.name.replace(/\.png$/, '')
        return {
          name,      // 如 "伤害药水法术"
          path: e.name  // 如 "法术-伤害药水法术.png"
        }
      })
} */


// 前期数据生成用，插入数据库（后期建表和插入数据不需要）
/* app.get('/insertTroops', async (req, res) => {
    const target_dir = '../clash_of_clans_picker/public/images/troops'
    try {
        const pngFiles = await getAllPngFiles(target_dir)
        pngFiles.forEach(async (file) => {
            const data = [file.name, file.path, 0, 'troops']
            const results = await exec(sqlStr, data)
            if (results.affectedRows === 1) { console.log('插入成功') } 
        })
        res.json(pngFiles)
    }catch (err) {
        console.log(err)
    }
})
app.get('/insertSuperTroops', async (req, res) => {
    const target_dir = '../clash_of_clans_picker/public/images/super_troops'
    try {
        const pngFiles = await getAllPngFiles(target_dir)
        pngFiles.forEach(async (file) => {
            const data = [file.name, file.path, 0, 'super_troops']
            const results = await exec(sqlStr, data)
            if (results.affectedRows === 1) { console.log('插入成功') } 
        })
        res.json(pngFiles)
    }catch (err) {
        console.log(err)
    }
}) */