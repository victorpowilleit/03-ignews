import Head from 'next/head'
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