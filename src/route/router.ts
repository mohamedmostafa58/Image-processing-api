import express from 'express'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
const router = express.Router()
export async function imgresize(
  width: number,
  height: number,
  path: string,
  output: string
): Promise<string> {
  await sharp(path).resize(width, height).toFile(output)
  return output
}

router.get(
  '/',
  (req: express.Request, res: express.Response): express.Response => {
    return res.send(
      'send url/resize-image?name=name&&width=width_value&&height=height_value'
    )
  }
)
router.get('/resize-image', (req: express.Request, res: express.Response) => {
  const img_name: string = req.query.name as string
  const height: number = parseInt(req.query.height as string)
  const width: number = parseInt(req.query.width as string)
  const path1: string = path.resolve(`images/${img_name}.jpg`)
  const output: string = path.resolve(
    `images/output/${img_name}_${height}_${width}.jpg`
  )
  if (fs.existsSync(path1)) {
    if (fs.existsSync(output)) {
      return res.sendFile(output)
    } else {
      if (width > 0 && height > 0) {
        imgresize(width, height, path1, output).then((data) => {
          return res.sendFile(data)
        })
      } else if (isNaN(width) || isNaN(height)) {
        return res.send('you must define both dimensions')
      } else {
        return res.send('dimensions must be greater than zero')
      }
    }
  } else if (img_name == undefined) {
    return res.send('you must write the name of the image')
  } else {
    return res.send('this image doesnot exist')
  }
})
export default router
