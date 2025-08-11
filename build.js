const babel = require('@babel/core')
const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, 'src')
const distDir = path.join(__dirname, 'dist')

function transpileFile(srcPath, distPath) {
  const code = fs.readFileSync(srcPath, 'utf8')
  const result = babel.transformSync(code, {
    presets: ["@babel/preset-env", "@babel/preset-react"]
  })
  fs.mkdirSync(path.dirname(distPath), { recursive: true })
  fs.writeFileSync(distPath, result.code)
}

function transpileDir(src, dist) {
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file)
    const distPath = path.join(dist, file.replace(/\.jsx$/, '.js'))
    if (fs.statSync(srcPath).isDirectory()) {
      transpileDir(srcPath, path.join(dist, file))
    } else if (file.endsWith('.jsx')) {
      transpileFile(srcPath, distPath)
    }
  })
}

fs.rmSync(distDir, { recursive: true, force: true })
transpileDir(srcDir, distDir)
