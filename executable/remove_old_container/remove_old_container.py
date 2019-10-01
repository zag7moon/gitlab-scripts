import requests
import sys
import getopt
import argparse

processFlags = sys.argv[1:]
ap = argparse.ArgumentParser()

opts, args = getopt.getopt(processFlags, 'p:t:', ['project', 'token'])

ap.add_argument("-p", "--project", required=True)
ap.add_argument("-t", "--token", required=True)

dictArgs = dict(opts)

headers={'Private-Token': dictArgs['-t']}
projectId=dictArgs['-p']

repositories = requests.get(
  'https://gitlab.com/api/v4/projects/{projectId}/registry/repositories'
    .format(projectId=projectId),
  headers=headers
)

repositoryId = repositories.json()[0]['id']

registries = requests.get(
  'https://gitlab.com/api/v4/projects/{projectId}/registry/repositories/{repositoryId}/tags'
    .format(repositoryId=repositoryId, projectId=projectId),
  headers=headers
)

def get_timestamps(registry):
  name = registry['name']
  return name[name.find('-') + 1:]

sorted_registries = sorted(registries.json(), reverse=True, key=lambda registry: get_timestamps(registry))

for registry in sorted_registries[3:]:
  requests.delete(
    'https://gitlab.com/api/v4/projects/{projectId}/registry/repositories/{repositoryId}/tags/{tag}'
      .format(repositoryId=repositoryId, projectId=projectId, tag=registry['name']),
    headers=headers
  )
