import Ad from '../../components/ad/ad';
import './about.page.scss';

export default function About() {
  document.title = 'About - Broall';
  return (
    <>
      <h1>About</h1>
      <section className="about">
        <div className="flex col">
          <h2>What is Broall ?</h2>
          <p>Broall is a pet project that I made to learn Chinese and get the experience of coding a real web project.</p>
          <p>
            It's a site where you can read Machine Translation of Chinese Web novels, and mostly personal novel picks from yours truly. The primary feature are tooltips with the definition and
            pronunciation of each Chinese word, helping in learning mandarin. Other features available for registered user are bookmarks, proposing terms for better translation and reporting missing
            or wrong content chapters.
          </p>
        </div>
        <div className="flex col">
          <h2>How can you Help ?</h2>
          <p>
            The biggest assistance I'd would like, is registering and filling up the glossary list so that we can have some quality <abbr title="Machine Translation">MTL</abbr> {';)'}.
          </p>
          <p>
            Expense for server is something I can bear but would appreciate if you can disable adblock for the site, if it one day has ads. To be transparent with our readers, the most ressource
            consuming task is getting definition for each Chinese word.
          </p>
        </div>
        <div className="flex col">
          <h2>Content on the Site</h2>
          <p>
            You are free to use the content on the site if you wish to pick up a novel and translate it with the help of <abbr title="Machine Translation">MTL</abbr>.
          </p>
          <p>
            The only exception would be chapters that will be human translated and would be clearly indicated. Does this count as a spoiler ?{' '}
            <span role="img" aria-label="thinking emoji">
              🤔
            </span>
          </p>
        </div>
        <Ad ad_slot="7704046305" />
      </section>
    </>
  );
}
