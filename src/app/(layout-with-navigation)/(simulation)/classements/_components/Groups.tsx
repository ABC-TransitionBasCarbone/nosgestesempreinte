'use client'

import GroupLoader from '@/components/groups/GroupLoader'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { linkToGroupCreation } from '@/helpers/navigation/groupPages'
import { useFetchGroupsOfUser } from '@/hooks/groups/useFetchGroupsOfUser'
import GroupContent from './groups/GroupContent'

export default function Groups() {
  const { data: groups, isLoading, isError } = useFetchGroupsOfUser()

  if (isLoading) {
    return <GroupLoader />
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <Title
          tag="h2"
          title={<Trans>Groupes d'amis</Trans>}
          subtitle={
            <Trans>
              Comparez vos résultats avec votre famille ou un groupe d’ami·e·s
            </Trans>
          }
        />

        {groups && groups.length > 0 && (
          <ButtonLink
            href={linkToGroupCreation}
            color="secondary"
            size="sm"
            data-cypress-id="button-create-other-group">
            <Trans>Créer un autre groupe</Trans>
          </ButtonLink>
        )}
      </div>

      <GroupContent isError={isError} groups={groups} />
    </>
  )
}
