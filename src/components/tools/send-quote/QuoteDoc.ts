import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TextRun,
  TableLayoutType,
  ImageRun,
  AlignmentType,
  BorderStyle
} from "docx"
import { saveAs } from "file-saver"
import { QuoteData } from "@/types/quote"

const imageBase64Data = '/9j/4AAQSkZJRgABAQAAAQABAAD/7QCcUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAIAcAmcAFFJnVVJkSTVlNFFid1FiZnhZQnlPHAIoAGJGQk1EMGEwMDBhMDYwMjAwMDAwNTBhMDAwMDFhMTIwMDAwMjgxMjAwMDAzNjEyMDAwMGFiMWQwMDAwNDEyZDAwMDA4MDMwMDAwMGIyMzAwMDAwYzAzMDAwMDAyMDQxMDAwMP/bAIQABQYGCwgLCwsLCw0LCwsNDg4NDQ4ODw0ODg4NDxAQEBEREBAQEA8TEhMPEBETFBQTERMWFhYTFhUVFhkWGRYWEgEFBQUKBwoICQkICwgKCAsKCgkJCgoMCQoJCgkMDQsKCwsKCw0MCwsICwsMDAwNDQwMDQoLCg0MDQ0MExQTExOc/8IAEQgCDgIOAwEiAAIRAQMRAf/EALkAAQACAgMBAAAAAAAAAAAAAAAHCAQGAQMFAgEBAQAAAAAAAAAAAAAAAAAAAAEQAAEEAQIGAwEBAQEBAAAAAAIBAwQFACAwBhARMTM0MkBQEhOgYHARAAEBBAcFBgUEAgIDAAAAAAECAAMRQRIgITBRcdEiMXKhsUBQUmGCwjKRweHwEEKB0nOiE/FgYnASAQAABAMHBAMBAQEAAAAAAAERITFBAFFhIDBxgaGx8EBQkcEQ0eHxYID/2gAMAwEAAgADEAAAAZlCAAAAAAAAAAAAAAAHgRIT0830gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdB3xxp8WGVhi+vYOsvYXIQ9L6fQAAAAAAAAAAAAAAAAAAAAAAAAAABHhs1efDwl54AADnetEFu/RqXYRNwAAAAAAAAAAAAAAAAAAAAAAAAA6fJr0bZFXHCgAAAAO3qE3S7TXfUsc8/0AAAAAAAAAAAAAAAAAAAAAAdR2x9p0TmbgCgDk4bVrJ1gHqHlvb8QAA9qwlYe4uMiSWk5AAAAAAAAAAAAAAAAAAANBNkr34PnrzwAAzTElTcZFTHqDcSnZ0hW0avtBZaAbGcJTXicYUXpABzv8fi32dU6wqbYAAAAAAAAAAAAAAAAB1eZXs22JfnhQAHKUjVLDev3oB807uJTs6QraNX2gtIEaltoqb4tvYANBc8KA7ukTnLFNZCSxLCzQAAAAAAAAAAAAAdR26FqERGd5woADM9qwxq8kCAAfNO7iU7OkK2jV9oLSBAHHIiGFrj6eVjex46gAe9YSruQXERTKqcgAAAAAAAAAAGjGxV88DzF54AAZZjSfuElpj5AAAAfNO7iU7OkK2jV9oLSBAAAPOr/ZH5KbcTXDC9YAOZFjkW/wA2qVhU2gAAAAAAAAD482vht8QfHCgAH1JZq9hfYykAAAAA+ad3Ep2dIVtGr7QWkCAAAANN3IVK8i3Vfl0ZzwAMjHE8ylTWR0sIw8wAAAAAHwfekafDx6HligAMr2bCmqycIAAAAANGNiqd6HlqA9vxBcDMqnYZNmAAAAA+foQ3DdyNKK0PV8pQANhsLVnJLhovlBAAAAFfrA1iNR4FAGSdEk7jKCYmWAAAAADr8yvpuEQfHCgAAMnGE9yjTSSUsExMsAAAAA8uvtlvgpvxMsPL1gA+plhiSiwQQAABWKztYjUAo+j37C+xnIAAAAAOs7NF06IT0PMFAAc7DLRAb1PLAANisNVfKLhIwk9AAAAAGkbuKj+Xbavq6W54ElRrJRYIIAAArFZ2sRqAV9fP0XG7OvsQAAAAaGbLXzX/ADV54AAZJjyRuMopi5YeVX2y/wAFN+Jkh9esAH1JcZC4WVVewybEAAAAB8fYhaH7k6KVtkrSN3WwQQAABWKztYjUAr6+fouN2dfYgAADq8yvht0R/PCgAHMims2E9vNQAABo28io3mW2r4umOeABlYosBJlNZOSfGPkAAAAAHkaDKoAAAAVis7WI1AK+vn6LjdnX2IAOo7dC06JDO84UABzwJvlyrNhU2IAAAADr7BCcRXJ0Mre9LzVAA2awtVMsuCjeSEAAAAAAAAAVis7WI1AK+vn6LjdnX2INBNlr54HnLzwAA+j5c8ADKxRP0nU1kpLAMTLAAAAAPHr5ZvqKc8S9Ei/AAOZRi0XEyKtWGT3wAAAAAAAKxWdrEagFfXz9FxuPHr+m3RL88KAAcyAazYLYc5ISiO5OhFcHo+coAGzWlp9cBPoAAAAADQd+FQ/PtnXpdRc8ADNwhYaRqaymk7ujvAAAAAAFYrO1iNQCueBn4AAAO71LCmoy1yQADxq92d6inPEuRKvyDKuBT+4CfQAAAAAAHV2iDomuVH5XNn4CgOeBtVhaoZxb5HkhoAAAAArFZ2sRqAUAAdp177uEupg54AAAANA38VCwLY16XXbgVAt+n0B4/seAa3IdN5TJ1dPcAAAAAeJXq0HSU64liKF4ABzK8T8lxe6r9hU9sAAACsVnaxGoBQDnejXbCe96KAAAAAAAOnuEJTX9AB4Hv+AVV+fr4Xa7C1Pzi3yPpBQAAAABHkhioODa+vS6q54AElRrJRYIIAAArFZ2sRqAVzx9kzzB0ZKAAAAAAAAAAAPA9/wCqvx9/CgfUsRLyXF7qwWFT2gAAAAOjvECxdaari9YElRrJRYIIAAArFZ2sRqAV2dfYW/ycbJQAAAAAAAAAAB5fqCoODa6vK6u54AHoeeLG7/TaWkm91doAAABrVXLR1cOsKkqNZKLBBAAAFYrO1iNQCuzr7C3+TjZKAAAAAAAAAAAAOjvEDRdcqNyvbMw1Ac8DcLB1M9Et20LfUAAA1qrlo6uHWFSVGslFgggAACsVnaxGoBXZ19hb/JxslAAAAAAAAAAAAAANfrzabHKdpRjBfkAH3LkQclxu2stg09cAGtVctHVw6wqSo1kosEEAAAVis7WI1AK7OvsLf5ONkoAAAAAAAAAAAAAAAjWShT7EtVXpdaAA9PzBZLeqby+k0uvsNaq5aOrh1hUlRrJRYIIAAArFZ2sRqAV2dfYW/ycbJQAAAAAAAAAAAAAAABjZIgGM7lRiQCysVQHPA3SwVSfULJ1cm2ET4AkqNZKLBBAAAFYrO1iNQCuzr7C3+TjZKAAAAAAAAAAAAAAAAAAa3Xq1OIU+SXGy/IAOeAASVGslFgggAACsVnaxGoBXZ19hb/JxslAAAAAAAAAAAAAAAAAAAEXygKeY1pq9LrwAAElRrJRYIIAAArFZ2sRqAV2dfYW/wAnGyUAAAAAAAAAAAAAAAAAAAAYeYK+RvcqLSBmRjqAkqNZKLBBAAAFYrO1iNQPpeNv2ya057AAAAAAAAAAAAAAAAAAAAAAA1evdrMIqAkaOl4kqNZKLBBAAAFYrOwWRtP2ye2AAAAAAAAAAAAAAAAAAAAAAAAAcRVKwp3IUsaCTQAAABxyAAAAAAAAAAAAAAAAAAAAAAAAAAAHHIAA/9oACAEBAAEFAv8A0Uyc3FRviBz/AEjyQkD+9Y3QsY68Tq5GlnHKvtQlfuGaAlldq5pQumV17iL1/ZmTm4qTrJyUuuutjjZHkg+P61jcixjzxOrsxpZxygWgSv1DNASxvFc3RJRyuvev6Uua3GSdZOSl3663ONjEgHx/OsbgY+PPk8X0Ysw45QLMJX5hmgJY3insQa1yUqp00RWP9jlwzjFqElHK68QvypcwIwz7M5S666kVzBBAE+/Or877APDY05x9iuuDj4w+Dw/jWNwEfH5BPFqaZJ1a6mFjkuH351fn5WNGhYQqOuJMOMUCzblfiESClleKWKvXXBrnJSw4LcVOS4ffnV+fnPrAlZKhnHLUJqK114h/hSpgRhsLM5S666kV3AbQE5rh9+dX59D8cHxsag42xXXBR8ZfF4fvWNuEbH5BvFqaZJxa6lFnUuH351fn1WNF1wh6a4k1yMUCyblJ9siQUsrz+sVeuuFXuSlhwG4qalw+/Or8+ufVhKyTEOOWoDUFrbxD+1KlhGGwtDlLrraRXcbbFtNa4ffnV+fYkRgfGxqTjbFbcExjLwvD9axtgjZIkm+WpponFrqUWdpcPvzq/PsqnXLGixR6a4c5yMUGyblJ9NSQcsrzrir11wq9yUsKA3FTaXD786vz7dhVBKyTEOOWptxQWtu0c+lJlBHGwtDlbFbSk9jTQtptrh9+dX59yRGB8bGpONsVtyTGMvC6O9YWwRskSTfLU22ri11ILW9KlBHFV0QnkadZeF4dxU65Y0WKPTXDnuRig2LcpNtV6ZZXmKvXXCgOSihV7cVN2wtwjZIkm+WmHOcjFBsW5SbthVBKyTFNgtTbitrXXaObd3NcJzXW0pPY00LQ7hEgpZXnXFXrsNuK2tbdo5vSYoSBsKo4uxQzXDLZuPZ0ttq4tbSI3vSpYRhsLQ5S7dbckxjToujuKnXLKjxU6auHvPs3Hs6IcBySUGuCKm7Y24RskSTfLdhz3IxQbBuUm7YVISckRjYLRw959m49nQw0LQ7hEgpZXnXFXrrhwHJJOcPt/wCciMbBam3FbWuu0d3pMQJA2FUcXRw959m49nQPbblSwjDYWhyl11tMT+NMi0OSYoSBsKo4uxW3RM406Lo7iihZZUfTFTpy4e8+zcezoHttWNuEbJEg3y1Ntqa1tIjelU65ZUfTFTprhWDkUoVg3KTdsagJOSIxsFw959m49nQPbYIkFLK8/rFXrrhwXJJQa5uKmuxqQk5IjGwWpt0m1rroXt6VECSNfWnEk7Nx7Oge2uVLCMNhaHKXXW05P4yyLI7MqIEkbCrOKuutuiaxtwXE+tcezoHtqsbcI+PyDfLXU1AdNwhQksqPpip01wrByKsKe3KT6tx7Oge2giQUsrz+sVeuzCsHIqwrBuUm7Y1ASckRzYLU06Ta110L31bj2dA9ucqYEYZ9mcpdtt1W1rrsXd6VECSNhWHFXXXXatY24LifSuPZ0D25WNwEfH5BPFvVt0TONOi6O4QoSWVH/OKnTXBsXIqw5zcpPo3Hs6B7ESCllef1ir11xIZySh1TUcbKj/nFTprgTXI5b1jTjIx+OTJamniaWuuRf+jcezokTAjBPszlLrrqc5GMMAyPKxqAkY/HJktLXy35cMJIz6w4q6667VvANDTeuPZ0PPm6uoQUsrqNB1S4YSRn1hxV0NfL6BAhJZUahsQbJyKsSc3JTduPZ2osM5JQKxuLsEKEllRqOdObXyT6VjTjIx5gmS1MvE0tdci/u3Hs7NdUHJxiODI7VjTjIx5gmSxr5aJpqDNdci/vS4TckZ1a5FXXXXihgGhptXHs6xFSyuo+m9LhNyRn1jkVWvkmix9fK68VvANDTcMENLGjUNiDZORViTW5I7Nx7OqLEOQUCrCL9AwQ0nUitrosfXXlBsnIqxJrclN2xphfx5gml1cPefZuPZ011QcnI8cGB+tY+uvNl8mlrrgZG9LhNyUnVrkVdPD3n2bj2dFbR506fYsfXXTXXihgGhpuGCGlnTf4po4e8+zcezzTGvj9ix9ddUCzcirEmNyR3LT1178+HvPs3Hs80xr4/YltK608yTZamHyZKuuBkblp669+fD3n2bj2eaY18fszILcpJ1c5FXUi9MrbxRwSQk2bT1178+HvPs3Hs80xr4/aNtDSxpFb2IFmcVYswJI7Fp669+fD3n2bj2eaY18fuWNKL2Osk0upiQTJV1uEjYtPXXvz4e8+zcezzTGvj92ZAblJNrnIq6kXplbefzgkhJptPXXvz4e8+zcezzTGvj95xsXEsqRWtivtDirFlhJHRaeuvfnw959m49nmmNfH8CxpRex1om11R5JsFXW4SdFp669+fD3n2bj2eaY18fwZsBuUk2vcirqRemVt50wSQuVp669+fD3n2bj2eaY18fwnGhcSypSZ2K+0OLkWWEgbT1178+HvPs3Hs80xr4/iWNILuONq2uqPJNgjtgkxl0cPefZuPZ5pjXx/Fm17cpJsByKW3w959m49nmmNfH8Z1oXRsqUmdvh7z7Nx7PNMa+P5FjSI7jjatrscPefZuPZ5pjXx/JnVwSkmQHIxa+HvPs3Hs80xr4/lPMi6NlTExr4e8+zcezzTGvj+ZZUiOY42oLo4e8+zcezzgVjkpRTon5s6tblJMguRi58PefZuPZzplbRqWCKCn57zIvDZU5Mc+HvPs3HsssE8VdTjH/UsqNDwwUF4e8+zIrjlyokJuMP6s+tblJVQzjSv/hH/2gAIAQMQAT8B/wCEH//aAAgBAgABPwH/AIQf/9oACAEBAQY/Av8AyKKzadyZn8xaKgCg/twHkcc+TUkGI5jPv+i7gpczJOp8mKlEknH9KSDD65tD4Xnhxy78KlGAEy1B1FKZmatBzq2NQfnJf9tfn31FZtkmZa2xI3JG4anzuKJ2nfhw4dNzUkGI6Z970UbS+Sfv5NSUYkzuqSDD65tD4V+HHLvQlRgBvJag52UzVM6Dne2NQf8A8L/tr3lFZtkmZa2xMkjd9z2Cirad4YZaNSQYju+ijaeck5+fk1JZpEz7FSQYdDm0PhXNOmPdhJMAN5LUHNiZqmcsBzuLLEjeo7vuaqURhSMGorGWByrxBg1B/Zgv+2vdUVnITLW2Jkkbvubim+2UyTM6Dm1FIgBIVXXGPq1FYiGpJ23eMxnrcUVbbvCYy0akgxHc5Sjaeck56MVLMSa4SkEkyDUnm0vknU+dd1xj6/rTcWYo/ro0CIV6SDoc28K5p0x7kJJgBvLFDmxPjmcsLjZsA3qO4ffyaCBad6pm4dcY+tSPwrkrXFqKxDocq8QYFqD6w+ORzwz7ipLOQmcmwRJOuJuKb2KUSH7laDmwSkQAkLl1xj61aKxENSG07xwz1uKKtp3hMZaMFIMQe3lKdp5yTnoxUsxJrhKQSTg1J5BS5CSdTduuMfWvTcfyj+ujW16SDmJHNrNlc06YjthJMAN5Yoc2DxzOWGdxs7hvUdw+/k0Ei071TN464x9biPwr8WObUViH1yrxBgQwQ+sV45HPDp2qks5CZyaG5Ek643FN7FKMP3K0HNglIgBIXrrjH1uaKxEdMmpDad+LDPXdcBC9p3zTlp8mC0Gkk9nKU7TzCQz0YqWYk1wlIiSwW9gpchJOpv3XGPrd03AzR/XT5XEUnMSObWWLmjTEdkibAGKHNg8ePDr8riCRZNUh+YNs2qmo7z9uwOuMfW8j8LzxY5tRWIfXKuCDAhgh9YrxyOeB5dipLMMMTk0PhdyTrj0uAt5FKP8AZWg82CUAJSJDsLrjH1vaKxEcxk0fid+LDP8AIXAQvad805afJgpBpJN/RG28wwz0YqWYn83VwlIiTuDBb3aXJMhqb6kswwEzlVQo7kqBYLQaSTfFbj+Uf10+VxFJsmJFrLFTTP7i8iWKHH8r/rr8riCRZNUh+YNs2qmo7/8Aq+KU7TzCQz0YqWYk1opOYkc9WssXNM/uL6I2XmOObFKxA/m6uFJMCNzBD6xclSOeBu1Oo7CTuxsBtxuAt5so5qywzYJQKKRK9ibAGKHNg8czlrchSTAhgh9YrxSOeB5X1FYj1GTR+J3JWuHS4/4lGKQkkR3iEOVt094vaKwSkRJYLfWrkmQzxPK+pLOQmcmhuRJOuN4EL2nfNOWjBSDSSZ3sCxW4/lH9dPlX9Cuqbp7xe0VYJGZkGstVNU/sL4pTtPMJDPRipZiTfRSbJiR/MW2bFTSd/wBxfUhsPMZHPVilYgRV9Cuqbp7xe0VQlAoi9JJgBvLFDmweOZywzuIJFkzIfmDQST/yD9x3H+MGKViB/N1cKSYEbiwQ92VyVI6G+orEcDMZNH4ncla4dKnoV1TdPeL2iqLyks5CZyaG5Ek643AWvZd81Za/JglAopEv0orEcMRk0fidyVrh0uAh5tI5p1HkwUghSTMXsDaCxW5tHgwy0/X0K6punvF7RVF2Up2nmEk56MVLMSa4CRElgt9arwyGeJ5VYG0MVuLf/T+unyuIpNk0yP5i2zYqaTvH2vipOy8xkc9WKViBDehXVN094vaKouSSYAbyxQ5sHjmcsM7iCRmZDNrLVzXP+MBcFSdl5jI56sUrECK4UkwI3MEPYJXIyVob6isZGYybFBQqCvlvwN094vaKouKSzkJnJobkSTrjcBa9l3zVlr8mCUCikXVFYyMxk0d6JK1wuAh7FSMZp1DBSTSBmOzveL2iqK5Snaeck56MVLMSbhL1ZC47ki1P84m9gREFitzaPBMZY5XGybDvSdx/MWineN6TvHZnvF7RVFUkmAG8sUObB45nLDO62TZNMj+Yts2Kmk7x9r4qTsvOSs9WKViBFcKSSCMGovIJXIyVoeyveL2iqKlJZyEzk2CJJ1xN4FJMCNxYIewSuSpHQ31FYyMxk2KJK1wNxQexUiR/cnUc2CkmIMx2N7xe0VR+pSnaeck56MVLMSb8IebSP9k6jyYKQaSTMXpBEQd4Yrc2jwTGWOVxs7jvSdx+/m0UG0b0zH5j2J7xe0VQxJMAN5Yoc2J8czlhcUUDPAZtCFNREFEjlDBitzaPBMZY5XGybCbRI35UnZeclZ6sUrECK4UkkEYNReQSuRkrQ+XYXvF7RVpLMrBM5NgiSZfzibikrYd4zOWrUUCA/UqTsvOSs9WKViBFYZjr2CisZGYya21ElS+xuKD3aTIzGo5sFJMQZi/e8XtFWks0jXgBFqb+0yR/bStRWMjMZNiiSpfY1RmOvYSCIg7wxW5tT4ZjLHrcWWpO9J3HQ+bRQbZpmL57xe0XdFAj0GbR+Jc1aYXBBEQd4LFbm1PhmMsetQZjr2MqRsvOSs/PzaisUSJV6SDRIm1Fey85K+/leveL2i6pK2XeOOWrUUCAuypGy85Kz1aisUSJfoMx1qvVJsKUEhqDzZXyVofK+gsZKmGttTJQ3fY3FB9amSpjUc2BSYg7iLt7xe0XEA1N/wDwj+2l9BYyVMNbamShu+xYZjrVff41dP0oPtpMlTGo5sCkxB3EXpChEHeC1NzanwzGo53FlqZpO77FooOaZi6e8XtFeigR6DNo/EvxadgIUIg7wWpubUTTMZYjnVff41dP1stSd6Tu+xaKDbNMxfUkbLzkr7+bUViiRKv6FdU3T3i9orUjsu/Fjw67mooEB1z7O+/xq6VKSDRIm1Fey85Ky8/K+gsWyVMNbak7lDcdD5VvQrqm6e8XtFULfZhH9tO0vv8AGrpWoPrUyVvUM8RzYFJiDuIvSlQiDIsXju1ExNOo51fQrqm6e8XtFVOQ7S+/xq6V7LUzSd32LRQcxMXr7hq+hXVN094vaKqch2l4gb1JIH8sQoFJEjXpIMCGCV7LzkrLS8fcNX0K6punvF7RVTkO1QWLRuVMNtWpO5Q3H7+VwEPrU+OYzxYEGIO43T7hq+hXVN094vaKqch2spUIgyLU3UVImJp1HO4xRNOmBakg5iYzuX3DV9Cuqbp7xe0VU5DttJ3BK5iStCxSoEEY1wpBgQwSrZeclZaXD7hq+hXVN094vaKqch26ChaNyphtrcdyhuP38rgIfWjxzGeObAgxB3Gs+4avoV1TdPeL2iqnIdvKVCIMi1N1FSMJp1HO4hvRNOmBakg5iYzqvuGr6FdU3T3i9oqpyHcJW6glcxJWhYpUIEVwpBgQwSrZeYSOWlR9w1fQrqm6e8XtFVOQ7i2rCNyhvDQULJKkfzC4CH1o8cxnq0RaD+j7hq+hXVN094vaKqch3GUqFIGRYrdxUj/ZOo87iHxO5p0wakgxxExmz7hq+hXVN094vaKqch3KVuoJXNMjoWKVCBG8VwpBgQz1J2XlA2SOWlX0K6punvF7RVTkO5tqxUlDf/00FCySpH8wvPQrqm6e8XtFVOQ7nKVikkyYrd7SOadR53foV1TdPeL2iqnId0lbrZXNMjoWKVCBG+59Cuqbp7xe0VU5Duq2xUlT+4aChZIyP5hcehXVN094vaKqch3WUrFJJYrRtO+ac9fnX9Cuqbp7xe0VU5Du0rc2K8EjlgeTEEQIq+hXVN094vaKmCJq0xLAYd3W2LkvXENBQyMjlU9Cuqbp7xe0fqFvrEyTM54DmwAEANwHeBSsUklitG075pz1+f6+hXVN094vaGooFImTBS9p5yTlr3oVubFeCRyw6MQRAhvQrqm6ewsSFWqO74R8y0EDMzPe1uyuStcQ1FY/YqBkbU7v/hP/2gAIAQECAT8h/wCinkUryDNSwNMKEMuIT1UOEOeklzIVH3+JV2VGPs5LuJ1NlUV/mQSLfgolyjcGQudrJgKOVVMtTuaVPfD4GipAMRdZso/d1ml1jsMxUERISglGU44JhkDxdMtFcAIjEaJ7zUIRhW8jLNZGIjcROcz7HINwrMZmnmU06mmIG97NZCo8fd43DprVtc9DmmF665V/zIJG6n5pRuAsLnUsmD7Oqfk7nUue6BENFEAMRhFcw4d+o0wsd4gKRERJIlESY4KFIMjxS4JZwwMZkx9xruIwreRlmsjE8YVVJq9x5Bv44gkTWz47TillDBA7/I5JUdH2+PQr127tDnDDRNUvIBoS9FOzXKgWFzqWcHwSSKtdXZ1LntgRjRRADjiMKuQo+YnVphY7aCG0Umn0HNMRice+xY9YoRhGNpZYkwNUTAur9y5tuCETEYI5iUcQxBSsj9OjOGBj7TV0aM3Mj7oXxMiHVSavcaWL7YRxDgatDj36jTAwBoAQAxU4vd2PG5YKivnZzGo6mIjF8KTslnDcQGJ4VvdLKGBRX+RySo6Ps8hXnSVdHOGEy1y9sg0JbdOmwRf8zWRiDwpaFW07jkH4ocVOL3djxuX4JGTiOAKdkfp0ZQw4oRJEgjkjR25MKyRmBYX7lnAMBgkV7qzqXPZDTGijAAzcRFsKDR9RrVtCuEq24LEVD4hrBZzTGqQVvsZBI/NDipxe7seNy2B8UkgJXQ2dSzidmskwLq51Lm2SUExGCOYlHEMUgEKeBu+DpgY+wtOAZvkPAvhYLDo04r+BYvthHEOopoh36y0MFxNACAbFDipxe7seNy2TA7/I5jUdTEUi6WfDKcEs4YhtDiHR/IvLVyhTBRb47JUdH18kcOmdnL6J5wJ4ZLfOWQUDQ20ZtABFfLtC+ITTbUY8I2sbVDipxe7seNy2iRkzHBRgDNs/pxSyhhGgRFEZIlRLJltywcyZ5D7qWywKFBIqz4rwuHrDTCijAAuuEi7RaczS+TaFcKou3DIg0PIMFnOGJxVa8AyCW3Q4qcXu7HjctwPs6A+BudSziPmpwuAurnUuG2cciIjBHRxEWUCj7LWrSnqnsNkTfIeBfCyKGyaSuruhbPbCOIHcRQHfUqtCuBJ0wQDcUOKnF7ux43LcoG9YzWaqPDCsxmg5AlOpptjDE3FOHe3NX6YODQJ2So6PpxIDXVc52T4E8IV7TIKBod57asXwAIr5exfEMEXGr5FaFi+6ocVOL3djxuW6AIJEamCY5h8XXLRTDNEgijaCVJzjt0F7sz0dmp0wTihkUZmb3Bzh6QhQBFWQGuJptBv+g+XVh3FnHbkEFndfN0TzhiCzE8xTIG7ocVOL3djxuW8BQ6QJaDc1qYaJc4XBmrna4badkREYI6OItimUP3Hy0p6KXuoKpkL+Rw80jJ0u7ujWu2EcVAuIQgGn9DaFcUGoBA3lDipxe7seNy3qHvWMzNVHCKZzIHIG3GrSm2MMTK0i/GXNXNbAZaBPJOY781g6uUd3/p64dK3wGQoGhzi7b0HwAirp5K+ISQGNTLj/AIFs98/g1KiZC/kcRmPldiMvEEKwI/vAwaBOzccxnvQCJEajRxSGuT4v5rYZokEUeJXbrLK9PU7JM1piY8Mnsmp3DnPeGVACasgMRYpCl1+hq/bDtWasebt0QjO6+uifAniGxE1zQyyB33xEBrquf6T4E8OF6QyCgaHOLtCpe7M9HYTOEsTHhE1k1O4c98YwtLLSb8anTCZS+EzVE1OcHbWgmKGCOj5riPgaVB7eAbZbtHwGAyuHGZFDKM9sI4mIrhQuKjVPLPBxaAeV13qBAEVWAGrhYm0HyQ+WWeHcWcdwtBERGCOj5riJgplL+DN030jdUaJmqj44aaxkWjQN0b1aU2xhjPEgIiQeg0tuugbStBEACKuh5riBgKdV7eAWz30ifIm+Qv2L4WUbJpK6u6Fs92MMTQ0i/wBw1cssHloB5XTemUBGSMxMQYJSt0+xq/TDtEgjDmbVbdR0DZaSxXker2CbwniR8cnk2h2DnvgIDrnOdk+BPCBc5YyCgaHVnvq6Rn09TPRPjTEVqHpmp3DnvjWDo6Nj/o4Sw6X4iZjRNTnB2a26joGwmBsiSDyuu9NMKKMAC64WNtBpzNL5ZZ4dRduksr9dz0TdK4UTplZcmgyQma3dKXwmaompzg7b0HxBgjp5xxGiIwoZcf8ABtlvpW6tBc1byOGmsZOtjd1WhTYrbqOgbCY6A7bx7BZE3yHgXwko2TSV1d0LZ7YRxNDWLfUNX7YLLQDybr+Je6qomat5HDTWMi0bG7q0ptjDEwEeAxiWn9BbLFCKCRN6QgAgjMTUwsDajf8AafLLLDqDL8Vt1HQNhMdAdt2JBw+apGX0TzgTwpW+csgoGh3ntp0RAAiroea4g6K5W/YfDWuyZQEIIzExJJFW8+xq/TDuDKG3UAs7r5OifEliM1A+8a5E774CA6ZynZPiSwgXOZZjRNTvLFTdR0DYTHQHbcmmFFGABdcJF2i0/VfJtCuFUXbor3ZHq7FXrg3BGIITZnYHOO4EgNNRynZM1JYQrnLmY0TU6O2zB8UMEfOTfEcCGFHK/RRtlvlsdkSfNeDfCCNMeayjQ4Nsjc9A2Ex0B23DyAyZvkPAvhInLacVd0LF9sI4m4rj2tjV+2Bi0Ad266u6mT5ElzXg3wsq2TSdhd0bZbYwxkoRUXfQqWjTBk6JIj6foGwmOgO23JXDpec5fRPOFcOFvnLIKBod57ZhcLaLIHFYyoas96gECCJETUw0LarX9F8sssKoO3HMRvIydE844iNh5QqZJL03QNhMdAdtk0xoowALrhYmwYNH1XybQrhJncxjEbO6+TonnHERqB5iuRN8JBw65WUvonnElhSts5ZjRNTvLbVm0RUE8uUb4hNNlBvCVGz6XoGwmOgO2w04Bm+Q+6F8PBYdGnH/AAFi+8ag+IMEdPIN8RkoYUMuP+DbLfPYjJk+a8G+FikejTgP4Nm22MMQ6gioHfoLRwBOeEiPo+gbCY6A7fmQuHTOzF9E84YbLfOWQUDQ2w2xhiYiPAYxDSPyJ5NsHFoPCum9NMaCERHMwkLYcWr6r5Fo0wlW3Eaiwxn8ILOccapBXu5kJei6BsJjoDtg0xoowAM3CRtYg0fVa1bQrhKtubAk0yBoq3dsYYITI0RqFEO6+EgbVavqvkWjTCSO2JZQj30JmeST5Swb6RuHW9oKOieccJlrhyzyTU26VNlQT+ZjJviGU2UPI4rPoegbCYPaAzeFn3QviHFhUer/AAFi+4gMXwpe6WUcCinlfVarq/mSuHXKyl9E844bLbOWZZNTa8JkwU3/ACcGvq+qN8SIjUSbR7FGzbbGGIerJKvHv0GuD4GiJETf9A2VGlQIuRbINCW2yKTIAirkBVxDAJF0Pt0F44CGyk4Bk+a+qN8R4kaiTaPYo2y2fCZMFPQFmNBCImpiAFIi198NKLRphIbc47icz6HMcUmEI1/MyySTvugbtnRqqyBurHVsYNgmkFKaGzq3dwaY0ARE1MQFsKLX9RpRaNMMH58JkxR6KTK9ZuzQ5xw0TVLyCaktsemiFf6ZjJxC4cqDRtMtTku96BumCRPm8N7pZRwCOfyua1XV3cjXxNwUdHOOHjapeQTUl+PCZMFNh8IpMkImIFApjRtO45LvqihGFfye4yb4lhHoptHsPJdscQlEy48e/Sa4CIaKIibvoG4VAFVgARVbATXBwgLJqn7cEs44CEiQb2ooRhX8nuUb4kBHoptHsNbNseAyYo2PC5sLBcQhGjU49+g1wFQ0URE3oRDQBETEZBMnM8O/Sa4TbnpGqptTuHMcVlCEa/mdkk7roG2zc0otAbqx1bGC7smimhsdW76AIhoAiJwwDJJGYmJxQuTWxTY8LmxU/ie94ptTuHMcU3EI1/MyySTvonDnRKNrlocxwnTVKv8ATUk7dTdR0DZYRwjMJqJ5gNehriDvezWaqur6fwubFT+Q6aIeQTRliHQrVm7NTku+psIwr+TlmMnEg7ReBm5LtVt1HQNhCOBgOMYdUK+ks40wAQCAUPUeFzYqdgYYhqpl3uXSa4CIaKIicd6fA0EIiYeUWaMjw0a4dituo6BsP1ezjxWR6nwubFTtTAj1U2p3Cty+KqhCLXcz7o23vVcVuLsVt1HQNhr5PZx4rI9TAJn9IiIGKmcgmfzJJNtsc2mTtkmjLEjUPncVHVyjvOq4rcXYrbqOgbDXyezjxWR6rQIK/wBzMZOILERD4hpBdyjtpRiIthQKu8GtS8a4NMaIMRHJ3XVcVuLsVt1HQNhr5PZx4rI9WXA0EIjiP1U1S79JrhIbcODGq04/4G5fHOgZPkPujbc9VxW4uxW3UdA2Gvk9nHisj1sZrtoM+Eb3MITaCCCeWaNttst8ZZJRNH+4krh0ys7fVPKJPcdVxW4uxW3UdA2Gvk9nHisj10oqleCZjLEIiLQjP4QXco7aTGEi7RK/ovkXjXBphRBiI3Ha6ritxdituo6BsNfJ7OPFZHrwJ1wRHETuJqLvqUXjXCQ2wkUerSd1/Bvng7HZknyHg22eq4rcXYrbqOgbDXyezjxWR7DDBV0fIrRuXwrF8ESCeWs220C3hlklE0e88AQHTOd7p8Sex1XFbi7FbdR0DYa+T2ceKyPYoLPixczHE4hsrp5OqeUa7bqJLCxNoHkp8s88ACAIiTE0fx1XFbi7FbdR0DYa+T2ceKyPYyb1QRMVAuZCIa/0F41wkNt4qGbrd3dG+eJH6iSXIW8hjquK3F2K26joGw18ns48VkeywkoY0M+H+DfPD0HwQgjr5O226X4iZJRNHlBxAdvmjd/aZ1xW8XYrbqOgbDXyezjxWR7NCYgaZo55h74qhGV09dU+JPbjs1t1HQNhr5PZx4rI9nOLULyuuJiK6QiWvYTzzwkN1W3UdA2Gvk9nHisj2mHESdB7w/wb54WgmASCOvnDc1t1HQNhr5PZx4rI9qgcwyWSaPYeWKyynT0ftM1J7ituo6BsNfJ7OPFZHtYZagfJOpiYGs34QqaP2wkNqtuo6BsNfJ7OPFZHtsGxVaH7j5aVwnZEESCOps1t1HQNhjAIUYtDT/AXbY0YB8e3M4IRACZkdg8oYoL2Znq7jM67FbdR0D8JFiAthRo+QlVeFMGmNAEAND3A4tQPcajkmJuK8a8Lc0fthIfituo6BhONoh5ANWWJGutdzq5Q90gLKjR9lpVpXDxkQRII6mK26iDeGQUlk7Hy51FGEe3m9ihb3ZUiCQEnwHQ+IYRQkXCZ1F9VL5u5h7xD/h//2gAMAwECAgADEgAAEAggggggggggggggghQAgggggggggggggggggggggggggggghkfjhQgggggggggggggggggggggggggggfnvvrhQggggggggggggggggggggggggjZvvvvvriyAgggggggggggggggggggggmXvusvuvvvmgQgggggggggggggggggggbnvum1fqkcvvrhQgggggggggggggggglZvvqgQlfqgQU/vvuwAgggggggggggghlfvvqoQglfqgQgp9vvmjQgggggggggggVnvuiwggglfqgQgghdvvrqQgggggggghRvvtmQgggglfqgQggggUvvvmyggggghifvvpoQgggggVvriQgggggtfvvvgQgggh/vvgYgggggnRvvvvqSggggghWvvmggggl/usQggggghfvvovvvqiQgggggXtqggggl/qgQggghVnvutQgUvvjoQgggggkYggggl/qgQggldvvvmQggkdtvvoQggggggQgggl/qgQhmfvvvmQggggksdvvngQggggggggl/qgRdnvutvvoSggggghUvvvrQgggggggl/qhZvvuoQ9vvvwgggggkdtvrhyggggggl/vnvvooQgsXvvwgggggggsdvruiQggggl/vvvuwgggggftwhRwggggghXvvqoQgggl/vviQggggggksQlRngQggggkWtvuggggl/vkQgggggggggglVvipQggggkmvqggggl/qgQgggggggggggPtvrowggggq/qggggl/qgQggggggggggggpdvrniQggq/qggggl/qgQgggggggggggggtcvvmoQgq/qggggl/qgQgggggggggggggggWvvrgSq/qggggl/qgQgggggggggggggggghdvrupPqggggl/qgQgggggggggggggggggpevvvvqggggl/qgQggggggggggggggggggkfvvvqggggl/qgQgggggggggggggggggggkmfvqggggl/gwgggggggggggggggggggggghdqggggl6wggggggggggggggggggggggggsTQgggkgggggggggggggggggggggggggggkggv/2gAIAQMSAT8Q/wDNp7CewnsJ7CewnsJ7CewnsJ7CewnsJ7CewnsJ7CewnsJ7Cf8AQ//aAAgBAgABPxD/AIQf/9oACAEBAgE/EP8Aoh8wJdU0oOQGcYDrNsPVmkGBAdCFydWTxJe/1jKKashRsMLKipFf4wAsAKPwFcyKLwunWpmCcDhAZ/OuKLvvcGH5ADNcaARDU4jBJVsNkSSUmIKAGiImJKU4FnICa9gqABAFERGiJJPeaBvIVPgDJXHBCKhU/kPCO0KTGDgZBRUeEGeL7ICjcEoWNq407Pd7r/0TfqOcq38sVpkCwLBuijabCLtLatglq1ZM3zol8x7m7WQAS6ssQ4qSq/lfsp4pvFKOAoIwABojHECvKAygKfxNxkQAIjERojl7jQbZCp0TJXHGuzx0zgUuMd8ImScMUDn5ryLqyKKMJXT5O4e30fp7mHlR3as2i6ShkCBld9DZ8Bv8JylivFofOASn+Je2IXkQOqqkYj+ImI75QuwvU5KGRt5zDjhqdC5yEjEEfCPrYq5EuCjNNFzYn/w5kyzZkucO0vKxMRSAIWTElliRohR6Z/lACIiREmI0T2lLDgy9gd5QuMf354GXxFlUsdpPFMR2LCY85f6YSHaBCwbQbRYPrVYFJ2SOHbq0cDyWWpSFdoYUw746HyWehuH1JXCpO4D7ORBYpVnP3NmE8cqjiKAobSnGbtM3SEYPoFwXHHCNzbVQ5HOY6B7bYbQAQESCMxGomJLLUi6iqPXP8q8riYyswC47cn6EWoyLICzLlCJhlRnrJTctC9kftIlXikgMRyBmV+ePBSKj55xq7bCAYZ1+iJ3jGMhSamZsZLI/PQPbchtEGnTAJT/EsTfEXOE+eUsF9p8mxNxwAzO2JR7JSMqWg1o5IARiMxJiPsMLvJpS5nVYVEGLvSOPkUXqRY7SUfrEKnNBHEUj3FhYvIBoGx0D23QbRQopGVkaTtgYqVLyX3F+VRJk7SEzDduzv76WeoXdpVBuqRuAnrzIX8UouMIEtoDkKUjtK4s9v+XBTBAuIFRiD+KgtmVot5Cyq7PQPbdhtBlABBEiI1EbY0KUGaKp/U3D0chRwQgoqpm3UYSiPkDoNZCYCExdqzBcmXnrEoaJT4okAXcR5EQVVzf07hZJFZ/Nf61as9uW/sUz0fiTMww/khJrnQckOM9voHtvQ2i1atkkvjTL5hpWtjydYU7bZIrrDs2CY/4yliRyqN9IWL/QwESJMaepgQU/tDXWVRBi9Bg8F9JisZu0lHnPFSzP6oWbqAmnwIBw7tW+46B7b4NoQRbmShYWrjXgphZFRCZ4SZYPsokkg7SKJiS0SV5ETxosR5zHqkSFwEv6eClu1m4uTOBeSE0BSmduMx2yYSg4aGlzAJoxASArMUdPMfJNz0D234bQgABEIiNRGSYkNTiWc1bKvcKjZgkikwQAA1EE2xLopRuQaNnSlNCChKmFUZnAsUvSMfAuAVUyAwnDYWd9rNZigVSVjObVnNW6zb7csoiNOIrk8gTxlmkHCyLJHFnu+ge3oQ2hHALgDL4VwTZBudBeF6102+Km85rD3oxJY0EgrQW5z5GAx9C/FROjlmuhVBjNcIk2ZhtwDAsZs12kkMabkKtc2zECnCPEYQgjNdVZqzWbvOge3og2hHFiLTJ2SzODLHNzCFCk7dZwRGDJNpFExLUdBWjUcRHvMV/IlQoARk7+lrCHgypKYOUSZ9OfFXzFM283zGTQGhNZAmgxnncnuyXCPRGfexYhEHVys7FUGI1mVzqn72AvULcZAwLuTBW5j1QMhQAGSb00xkAINRGSYvLWI5om38CpswARESARgiXEEubYOZLnuL9KYEGcg37UpyhJvAoOoAFVWQGKqVIybzcCFwYrGoJZrUVZq3WK3dsBpYQ13yTOBKM8kdsL7UZt9Cy33IL3JnAzONUsUz+yo2mKR3vcH9imGKgHai5n1BlvtGt6KyhRIPxTKzmUZ+ashQSNvjQeWaxKtmgSWOl5lpY3zWOAx3VMRcSuKbglVgVZs12kUDFT3kOCJlyIrcRQzKwJ1W6maoqzd6g8A4CqkgMcBsLMn+bNbigVSVjObVnNW6zb7jjQPeaxrZoElgV302UFjfog4DHevRR4KR0L9BJBJYM9BF/Al1DBEkyTaRRMKIzPFA29dQkmhI35HhQfea5KtiqCeOr7kpYXyULgEN6tgNOoErXUQYjhrg4Hi6RxWM2a7pFExx74gtTT4hfiIGZ2JqNwMlTGTvQouhCFRGSYqhUxJvNxI3FisZBDJKgjMS4wS56VqRBzNV9wv0rAUJCDcFzKc4s99Bz5fpm4vW3wL/GqLFM/sdsQ2yWtj6CySOjCQQZoy8hLfEZb6lrH4kqykDnYM2jHg75Akejakfpgjt4OBFIq3U1U3epQ0SnxRAALuP0FNJ6ua0xRKqq5za6xbrNvtkpksw8hyJh0orEP4tmwenN/FXyBI28mzGTRWpJqNAmM/wCpPZa3zVR3xvZA0WtXRoExkGESLMw/YWCQkyT0LUjdwx5LJvLkV9oC6yqIMOhrh8l9JisZtdpFAxO+bEFoa/6mJB5gGBqt0qqKs38P5pgdHLNdGgTFpwj4GYb8DAkJMk2kUTH7/wDF2YZpFbjdAjBCSaIyRmMnesfAOIVEkjjiNhZ0/wA+S/FEKhRjKZUnMS4zL+gakbuGPJZN2wh8yJU5hihJCA2BSkdpWcds4KTzmufVUE8QCD8eG3KfIwCGw/kQwhURkjhuSSu/9FmxUCpIxlMqTmJcZl9shFjZ0dFcniMDMOoOEhJtFnCQ3sRPls+guLUuBaY1dZXO3MhvzqRu4Y8lk3KUtEp8USALuI8iIKorn/SuFkkVV+a/N2rV2yLoL3uDk8okghQ1REoMz7inuLuW+JXljBC2hqixXP6Ght8s3CwOpJGISCYzwmXNDn5mNXZvYUFP6Q10nQCYezlgvA6b4Qjdwx5LJuKfc0pczqsKiDEDBpF2+D61WM2rtIoGJ7xkMiJ40GJ15h1SMxdFbu6WwGvUKR00AmIQaYPBfWYpCTU2koxVEz4WWWbWUAaXH/YBcqX9WRu4Y8lk2zYX9ELj+IYQigDkKUjtK47YIsMIRIENbiHAQkSDeOsYOWqJJHApqkuKz/B3uLIIIp8V+LlSjtyXgYzWjCcGnABLCmT0lPvk+aXGIepI3cMeSybK9pEq8RIDEbh5nK5v1rgcUiv35POrPcyXiYl4DJpwASxnDkHGLNos4Mt9GE+bEosMIEwIDmKVjtKzhtk3gpg/TcEKHEX6mqtTjt78EeoI3cMeSybELvJpQ5nVQqIMX+kdtzrPUixnu+d7jJmpJJhIJjNKZPZmuMaqMsd7TzmtLkdRjQCYi9JJ3+C6VSG0lH76UxGrFaDHBZdhBAfBAOJ1LenI3cMeSyfkmH+olF5/EJ4k9McpSgdpXFntq/1DvhISdpFEx9t+CMwZkF7GqhmRJVHIMlTGTvV5SJV4JJHEOg5Ha5saCkBDzzhRntqB5YRxek5Gx/AQqdRcouZWcYh6Ujdwx5LJh+0iVeKSDGrQBX5Y8FIqPnkc6u3J/hErMNgbE+cEM3/AviHcrdcQ/WQdDXN+1cLiEE+vJ5UZ7cn2M2HyE7pgUQc98XH7QBTyEkSxOo5mlA1NpXOW2rNY/rAqwbDGb5BFuUarc6qh6QjdwxCtqKcKO6oXGH91nJqdZ6kWO0EaYckrGjwlLRqLB9aldU3dFfybH/RSiw/iEsTeGOYolTaVwZG1HpcDtv0sWgy4i8H5UaAxH/0Wh6zoRIbSUYzyuJ+heGgQ/CFLiejIjDDsYFewAgCwHNPbShcTOUiClgxFZQpGrVHp7SAAAAgBIAtsxe8mtD/So0BhP9LcPWamxIbMelwO3oGbyJPVEkmLohHDeG6AevbiqLpp3nAO0pOshE+Qs1YfUkZNgGSMg3QrcKkEkN5gTn+pbh+0iD1RJJiCgKnC/PHAzg+efzYj0OB29FS23sYHA5XDVm0TWJHIMrOMjaq3YMBpcSybhiy/Oo3yMp6UiCyMOcA/KrPK0ynKTunTd0juzpLz6J7myjGtpowbiTFmVxkfiPS4HbYQqZ8IrpOJJzMWGfq2+BlN7TT5CJoqOasMa7rPXONT4Q2kOcnXEPphRbyP0RayAKURJejIkRcgoCIIsBHGjigLxVP6uwyAAAAgAUAy3s8MpALVKoyixsMajrnXeNaqgYXocDttApQqqEx56/wmlkAUuJLeqVkAWqIyxH6Y025/AWwOczXbc53jrnUuMKKfIRKJ1Gc1YfQkRjZ6N4a07lanfVM/Mn6jfoVkAeqKk4jLlWu2YFmApcDttgowbijrnUuMKDbIRNVVmrDvr786DfIylL7Bk1lESzNhy2nv9SIpAi4CQUR+CgyxaGURUuCcLBrXD1YCmt9omk5i5KyuUfoF8sd9EpushE+Qs1cMQ1GE44TXwJT0bUjEQ8gTemIUUqWIkgFf7NAgAAAQAKAEg9aCic0nUxCoQUA6BfiXgFZAHqIJO9SH4QpZHDjMf8qzT8NAijUk+iakan2BvwKDDH9GVJnwqF1RNHCTlg7Qjcb3x+mPKZ+iakanqm/VpRiZYjOBHDJwpH0KzVxt8mTjaoZm8ZcZmXLCms9zZhvPH6Y8pn6JqRqerb8ZhI0iJkbmayMEIghn72cOOzaQioeecKmILAyK4vA+0iVOISTdeP0x5TP0TUjU9Y36Fj8gGo4hc5gM4GkeJeJVtDDB+4zn1OsdCF4+RWhyOgjUTufH6Y8pn6JqRqeub9B/FQS7KVW0hdVP5UFMEGwoVO3L6AZitQ7yuDgbG/ilVhuEDx+mPKZ+iakanr2/E5oSY70XNLjPE5/eCM6yZmG24JBPryWVSeIciIqipm/SuEKGiU+AIiJc2vH6Y8pn6JqRqewN+Mp8IQOHZqWxUs3+PFk6ASraGEzB0izFQ8tcrGWxBfSEus6iTZ8fpjymfompGp7E36JgFrM14/ghMJQcNTWqFCadvnEaLqx35EMDLvL59TcXpbbA8fpjymfompGp7G37TNQ4WT5o4MyaURO8RXN5A2wJVCJCUyjKYlkmWxxGwsj6+S3ED4FxCiEkfx4/THlM/RNSNT2RvxcrhGDLgjMSYzMX1JNVomWSVThSR2hhMkmM0oCRd4GkHEN1AC1q6NUmPH6Y8pn6JqRqezN+zjmT3ZrhHpjLm+YyKA1JjME0m3k0Y8HfMUzH24YAuvMjBx8yfompGp7O36WZ5A55JvpQmwopZMhrqZpG22BHo2pGp7Q34UMysRhRzAzBMZmK3v8AAJKGRBbiig+oakantLfkjiNdHO8z3zUDhwoPLMLSpZqkn6dqRqe1t+aySDcFzK84M8I5ku+4s/TEGpGp7Y34W8wH8I1CpARpiX46Cvaf6mKKD6RqRqe2t+SOM5BIvDblPkY8FN5zWHvUiT9E1IhHFMrD6SHQOpDNYgq1YAj09uhBQ1TCoMzgXKeHLopxuYZp9qJt+1Is4Hnn8MRUTUY/5+QIj7SIHUAkHuA95h0QJC4Es4lvE3MIHjQYooO9akdbTRgXiyF2Bxlg6S8r6S92yj3NBIMxxIoVG+sbF/oYcFlxzJMfCU921+rSuQ8LiShykSvRFmFh7tIYC5OWYLpl6x39ZMCdewboAUIX94gUYTKc/wDh/wD/2Q=='

function base64ToUint8Array(base64: string): Uint8Array {
  const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");

  try {
    const binaryString = atob(cleanBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (error) {
    console.error("Error converting base64 to Uint8Array:", error);
    return new Uint8Array(0);
  }
}

export async function generateQuoteDoc(quoteData: QuoteData, recipientName: string): Promise<Blob> {
  const { recipient, company, quotationItems = [], totalMandays = 0, totalOneTimeCostMilVND = 0, notes = [] } = quoteData || {};
  // Extract monthly operating cost if present or default to 3
  // const monthlyOperatingCostMilVND = quoteData?.monthlyOperatingCostMilVND || 3;

  // Header with logo on left and QUOTATION on right
  const header = new Paragraph({
    children: [
      new ImageRun({
        data: base64ToUint8Array(imageBase64Data),
        transformation: { width: 120, height: 120 },
        type: "png",
      }),
    ]
  });

  const quotationTitle = new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({ text: "QUOTATION", bold: true, size: 32 })
    ]
  });

  // Company info
  const companyInfoParagraphs = [
    new Paragraph({
      children: [new TextRun({ text: company?.name || "Rockship Pte. Ltd.", bold: true, size: 24 })]
    }),
    new Paragraph({
      children: [new TextRun({ text: company?.address || "OXLEY BIZHUB, 73 UBI ROAD 1, #08-54, Postal 408733", size: 20 })]
    }),
    new Paragraph({
      children: [new TextRun({ text: "", size: 20 })]
    }),
  ];

  // To: Recipient information
  const recipientParagraph = new Paragraph({
    children: [
      new TextRun({ text: "To: ", size: 20 }),
      new TextRun({ text: recipientName || recipient || "", size: 20, underline: {} })
    ]
  });

  // Table headers
  const tableRows = [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "No.", bold: true, size: 20 })] })],
          width: { size: 10, type: WidthType.PERCENTAGE },
          shading: {
            fill: "E6E6E6",
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Item", bold: true, size: 20 })] })],
          width: { size: 50, type: WidthType.PERCENTAGE },
          shading: {
            fill: "E6E6E6",
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Mandays", bold: true, size: 20 })] })],
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: {
            fill: "E6E6E6",
          },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: "Cost (mil VND)", bold: true, size: 20 })] })],
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: {
            fill: "E6E6E6",
          },
        }),
      ],
      tableHeader: true,
    }),

    // Items rows
    ...quotationItems.map(item => new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: String(item.no), size: 20 })] })],
          width: { size: 10, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: item.item, size: 20 })] })],
          width: { size: 50, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: String(item.mandays), size: 20 })] })],
          width: { size: 20, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: String(item.costMilVND), size: 20 })] })],
          width: { size: 20, type: WidthType.PERCENTAGE },
        }),
      ]
    })),
    // Total one-time cost row
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: "Total one-time cost", bold: true, size: 20 })]
          })],
          columnSpan: 2,
          width: { size: 60, type: WidthType.PERCENTAGE },
          shading: {
            fill: "E6E6E6",
          },
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: String(totalMandays), bold: true, size: 20 })]
          })],
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: {
            fill: "E6E6E6",
          },
        }),
        new TableCell({
          children: [new Paragraph({
            children: [new TextRun({ text: String(totalOneTimeCostMilVND), bold: true, size: 20 })]
          })],
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: {
            fill: "E6E6E6",
          },
        }),
      ]
    }),
    // Monthly operating cost row
    // new TableRow({
    //   children: [
    //     new TableCell({
    //       children: [new Paragraph({
    //         children: [new TextRun({ text: "Monthly operating cost", bold: true, size: 20 })]
    //       })],
    //       columnSpan: 2,
    //       width: { size: 60, type: WidthType.PERCENTAGE },
    //       shading: {
    //         fill: "E6E6E6",
    //       },
    //     }),
    //     new TableCell({
    //       children: [new Paragraph({
    //         children: [new TextRun({ text: "", bold: true, size: 20 })]
    //       })],
    //       width: { size: 20, type: WidthType.PERCENTAGE },
    //       shading: {
    //         fill: "E6E6E6",
    //       },
    //     }),
    //     new TableCell({
    //       children: [new Paragraph({
    //         children: [new TextRun({ text: String(monthlyOperatingCostMilVND), bold: true, size: 20 })]
    //       })],
    //       width: { size: 20, type: WidthType.PERCENTAGE },
    //       shading: {
    //         fill: "E6E6E6",
    //       },
    //     }),
    //   ]
    // }),
  ];

  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows,
    margins: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
    layout: TableLayoutType.FIXED,
    borders: {
      insideHorizontal: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "000000",
      },
      insideVertical: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "000000",
      },
      top: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "000000",
      },
      bottom: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "000000",
      },
      left: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "000000",
      },
      right: {
        style: BorderStyle.SINGLE,
        size: 1,
        color: "000000",
      }
    }
  });

  const notesParagraphs = notes?.length ? [
    new Paragraph({ children: [new TextRun({ text: "Notes:", bold: true, size: 28 })] }),
    ...notes.map(note => new Paragraph({
      children: [
        new TextRun({ text: "• ", size: 20 }),
        new TextRun({ text: note, size: 20 })
      ]
    }))
  ] : [];

  // Add development timeline note if not already in notes
  const hasTimelineNote = notes?.some(note => note.toLowerCase().includes('timeline') || note.toLowerCase().includes('development'));

  if (!hasTimelineNote) {
    notesParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: "• ", size: 20 }),
          new TextRun({ text: "Development Timeline is around 1 month", size: 20 })
        ]
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        children: [
          header,
          quotationTitle,
          ...companyInfoParagraphs,
          recipientParagraph,
          new Paragraph({ text: "" }),
          table,
          new Paragraph({ text: "" }),
          ...notesParagraphs
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);

  saveAs(blob, `bao-gia-${recipient || 'du-an'}.docx`);

  return blob;
}