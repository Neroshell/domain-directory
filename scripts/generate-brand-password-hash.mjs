import { randomBytes, scryptSync } from 'node:crypto'
import { stdin, stdout } from 'node:process'

if (!stdin.isTTY || !stdout.isTTY) {
  throw new Error('Run this command in an interactive terminal so the password can be entered without echo.')
}

stdout.write('Brand access password (input hidden): ')
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')

let password = ''
stdin.on('data', (character) => {
  if (character === '\u0003') {
    stdout.write('\nCancelled.\n')
    process.exit(1)
  }
  if (character === '\r' || character === '\n') {
    stdin.setRawMode(false)
    stdin.pause()
    stdout.write('\n')
    if (password.length < 12) {
      stdout.write('Use a password with at least 12 characters.\n')
      process.exit(1)
    }
    const salt = randomBytes(16)
    const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 })
    password = ''
    stdout.write(`BRAND_ACCESS_PASSWORD_HASH=scrypt:${salt.toString('base64url')}:${hash.toString('base64url')}\n`)
    return
  }
  if (character === '\u007f' || character === '\b') {
    password = password.slice(0, -1)
    return
  }
  password += character
})