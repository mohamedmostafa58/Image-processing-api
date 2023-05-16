import app from '../index'
import supertest from 'supertest'
import path from 'path'
import size from 'image-size'
import { imgresize } from '../route/router'
const reqobj = supertest(app)
describe('Test endpoints', () => {
  it('make req to root endpoint', async () => {
    const rootreq = await reqobj.get('/')
    expect(rootreq.status).toBe(200)
  })
  it('make req to resize endpoint', async () => {
    const imgsizerequest = await reqobj.get(
      '/resize-image?name=megha&&height=200&&width=300'
    )
    expect(imgsizerequest.status).toBe(200)
  })
})
describe('Test the imageresize function', () => {
  it('test the size of output image', async () => {
    const imgpath: string = path.resolve('images/megha.jpg')
    const outimgpath: string = path.resolve(`images/output/megha_350_350.jpg`)
    const imgoutput = await imgresize(350, 350, imgpath, outimgpath).then(
      (data) => {
        return data
      }
    )
    const imgsize = size(imgoutput)
    expect(imgsize.height).toBe(350)
    expect(imgsize.width).toBe(350)
  })
})
