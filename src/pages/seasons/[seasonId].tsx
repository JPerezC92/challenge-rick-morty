import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { HiChevronDown } from 'react-icons/hi';
import { CharacterModelToView } from 'src/modules/characters/adapters/CharacterModelToView';
import { CharacterView } from 'src/modules/characters/dto/CharacterView';
import { ApiCharactersRepository } from 'src/modules/characters/service/ApiCharactersRepository';
import { EpisodeModelToView } from 'src/modules/episodes/adapters/EpisodeEndpointToView';
import { EpisodeCharacterAvatarList } from 'src/modules/episodes/components/EpisodeCharacterAvatarList';
import { EpisodeView } from 'src/modules/episodes/dto/EpisodeView';
import { ApiEpisodesRepository } from 'src/modules/episodes/service/ApiEpisodesRepository';
import { SeasonList } from 'src/modules/seasons/models/SeasonList';
import { Accordion } from 'src/modules/shared/components/Accordion';
import { AccordionItem } from 'src/modules/shared/components/AccordionItem';
import { Heading } from 'src/modules/shared/components/Heading';
import { Icon } from 'src/modules/shared/components/Icon';
import { MainLayout } from 'src/modules/shared/components/MainLayout';
import { Text } from 'src/modules/shared/components/Text';
import { constants } from 'src/modules/shared/utils/constants';

export const getStaticPaths: GetStaticPaths = async function () {
  return {
    paths: SeasonList.map((v) => ({ params: { seasonId: v.id } })),
    fallback: false,
  };
};

type GetStaticPropsParams = { seasonId: string };

export const getStaticProps: GetStaticProps<
  SeasonDetailsProps,
  GetStaticPropsParams
> = async function ({ params }) {
  const episodesRepository = ApiEpisodesRepository();
  const charactersRepository = ApiCharactersRepository();

  const response = await episodesRepository.filter({
    episode: params?.seasonId,
  });

  const episodeList = await Promise.all(
    response.map(async (episode) => ({
      ...EpisodeModelToView(episode),
      characterViewList: (
        await charactersRepository.findManyById({
          characterIdList: episode.characterIdList,
        })
      ).map(CharacterModelToView),
    }))
  );

  return { props: { episodeList }, revalidate: constants.dayInSeconds * 15 };
};

interface SeasonDetailsProps {
  episodeList: (EpisodeView & { characterViewList: CharacterView[] })[];
}

const SeasonDetailsPage: NextPage<SeasonDetailsProps> = ({ episodeList }) => {
  const { query } = useRouter();
  const episodeCode = query.episodeCode as string;
  const seasonId = query.seasonId as string;

  return (
    <MainLayout>
      <main className="mx-auto my-8 max-w-7xl px-4">
        <Heading as="h1" l2 colorGradient="special1">
          {SeasonList.find((v) => v.id === seasonId)?.value}
        </Heading>

        <hr className="mb-8 mt-2 border-ct-neutral-ligth-400" />

        <Accordion
          className="divide-y divide-ct-secondary-400 overflow-hidden rounded-sm"
          defaultValue={episodeCode || episodeList?.[0].code}
        >
          {episodeList?.map((episode, i) => (
            <AccordionItem
              id={episode.code}
              key={i}
              value={episode.code}
              className="grid w-full grid-cols-[1fr_auto] items-center bg-ct-neutral-dark-700 px-2 py-1 text-left text-base font-semibold text-ct-special-ligth-100 sm:px-4 sm:py-2 sm:text-lg"
              as="h2"
              trigger={
                <>
                  <Text as="span">
                    {episode.code} - {episode.name}
                  </Text>
                  <Icon as={HiChevronDown} variant="sm" />
                </>
              }
              content={
                <fieldset className="my-4 rounded-sm border-2 border-ct-neutral-medium-700 p-2 sm:my-6 sm:p-4">
                  <legend>
                    <Heading
                      as="h3"
                      className="rounded bg-ct-neutral-medium-700 px-1 text-sm font-semibold tracking-wider text-ct-neutral-ligth-400 sm:text-base"
                    >
                      Characters
                    </Heading>
                  </legend>

                  <EpisodeCharacterAvatarList
                    characterViewList={episode.characterViewList}
                  />
                </fieldset>
              }
            />
          ))}
        </Accordion>
      </main>
    </MainLayout>
  );
};

export default SeasonDetailsPage;
