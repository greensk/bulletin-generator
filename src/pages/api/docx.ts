import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  convertMillimetersToTwip,
  HeadingLevel
} from 'docx'
import { NextApiRequest, NextApiResponse } from 'next'
import { Meeting } from '@/types'

export const createDocx = async function (meeting: string): Promise<Buffer | null> {
  const content = JSON.parse(meeting) as Meeting
  const word = new Document({
    styles: {
      default: {
        document: {
          run: {
            size: '13pt'
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertMillimetersToTwip(10),
              bottom: convertMillimetersToTwip(10),
              left: convertMillimetersToTwip(15),
              right: convertMillimetersToTwip(15)
            }
          }
        },
        children: [
          new Paragraph({
            text: 'Решение собственника помещения №___ по вопросам, поставленным на голосование на общем собрании собственников',
            heading: HeadingLevel.HEADING_1
          }),
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },
            columnWidths: [50, 50],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Номер квартиры (помещения)')]
                  }),
                  new TableCell({
                    children: [new Paragraph('')]
                  }),
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Фамилия, имя, отчество собственника')]
                  }),
                  new TableCell({
                    children: [new Paragraph('')]
                  }),
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Реквизиты домента, подтверждающего право собственности')]
                  }),
                  new TableCell({
                    children: [new Paragraph('')]
                  }),
                ]
              })
            ]
          }),
          new Paragraph({
            text: 'Решения по вопросам повестки дня',
            heading: HeadingLevel.HEADING_2
          }),
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },
            columnWidths: [5, 65, 10, 10, 10],
            rows: [
              new TableRow({
                tableHeader: true,
                children: [
                  new TableCell({
                    children: [new Paragraph('№')]
                  }),
                  new TableCell({
                    children: [new Paragraph('Вопрос повестки дня')]
                  }),
                  new TableCell({
                    children: [new Paragraph('За')]
                  }),
                  new TableCell({
                    children: [new Paragraph('Против')]
                  }),
                  new TableCell({
                    children: [new Paragraph('Воздержался')]
                  })
                ]
              }),
              ...Object.values(content.questions).map((questionItem, questionItemIndex) => {
                return new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(String(questionItemIndex + 1))]
                    }),
                    new TableCell({
                      children: [new Paragraph(questionItem)]
                    }),
                    new TableCell({
                      children: [new Paragraph('')]
                    }),
                    new TableCell({
                      children: [new Paragraph('')]
                    }),
                    new TableCell({
                      children: [new Paragraph('')]
                    })
                  ]
                })
              })
            ]
          })
        ]
      }
    ]
  })

  const result = await Packer.toBuffer(word)

  return result
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const result = await createDocx(req.body['meeting'])
  if (result) {
    res.status(200).setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document').send(result)
  } else {
    res.status(404).setHeader('Content-Type', 'text/plain').send('Документ не найден')
  }
}
