module.exports = async function () {
  const { default: conventionalCommits } = await import('conventional-changelog-conventionalcommits')

  const config = await conventionalCommits({
    types: [
      { type: 'feat', section: '✨ Features | Yeni Özellikler' },
      { type: 'fix', section: '🐛 Bug Fixes | Hata Düzeltmeleri' },
      { type: 'perf', section: '🚀 Performance | Performans İyileştirmeleri', hidden: false },
      { type: 'refactor', section: '♻️ Code Refactoring | Kod Düzenlemeleri', hidden: false },
      { type: 'chore', section: '🔧 Chore | Bakım ve Yapılandırma', hidden: false },
      { type: 'docs', section: '📚 Documentation | Dokümantasyon', hidden: false },
      { type: 'test', section: '✅ Tests | Testler', hidden: false },
      { type: 'style', section: '💎 Styles | Kod Biçimlendirme', hidden: false },
      { type: 'ci', section: '👷 Continuous Integration | CI/CD İşlemleri', hidden: false },
    ],
  })

  return {
    git: {
      commitMessage: 'chore: release v${version}',
      tagName: 'v${version}',
      requireCleanWorkingDir: true,
      commit: true,
      tag: true,
      push: true,
    },
    github: {
      release: true,
      releaseName: 'v${version}',
    },
    npm: {
      publish: true,
    },
    plugins: {
      '@release-it/conventional-changelog': {
        parserOpts: config.parser,
        writerOpts: config.writer,
        whatBump: config.whatBump,
        infile: 'CHANGELOG.md',
      },
    },
    hooks: {
      'after:bump': 'echo "Yeni surum v${version} olarak guncellendi."',
    },
  }
}
