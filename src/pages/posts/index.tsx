import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'

export default function Posts(){
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Título do Post</strong>
            <p>Pequena descrição ou parágrafo da postagem</p>
          </a>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Título do Post</strong>
            <p>Pequena descrição ou parágrafo da postagem</p>
          </a>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Título do Post</strong>
            <p>Pequena descrição ou parágrafo da postagem</p>
          </a>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Título do Post</strong>
            <p>Pequena descrição ou parágrafo da postagem</p>
          </a>
          <a href="">
            <time>12 de Março de 2021</time>
            <strong>Título do Post</strong>
            <p>Pequena descrição ou parágrafo da postagem</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps:GetStaticProps = async ()=>{
  const prismic = getPrismicClient()
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 20
  })
  console.log(JSON.stringify(response, null, 2))
  return {
    props:{}
  }
}